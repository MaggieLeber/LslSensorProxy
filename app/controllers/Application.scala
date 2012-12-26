package controllers

import play.api.mvc._
import java.net.URL
import io.Source
import java.io.InputStream
import play.api.libs.json.{JsValue, JsString, Json, JsObject}
import scala.collection.immutable._
import collection.JavaConversions._
import com.mongodb.casbah.Imports._


object Application extends Controller {
  //todo: automatic sensor registration
  val mongoConn = MongoConnection()
  val coll = mongoConn("lslproxy")("sensordata")
  BsonBigDecimalSupport() // register our BSON encoder

  def harrington = Action { Ok(views.html.harrington()) }

  def sensor(sim: String, port: String, cap: String) =
    Action {
      // connect to the remote scripted object in-world
      val conn = new URL("http://sim"+sim+".agni.lindenlab.com:"+port+"/cap/"+cap).openConnection()
      //todo: handle connection errors
      // parse the headers - it's a mutable Java Map; make it scala.collection.immutable.Map
      val headers = conn.getHeaderFields.toMap ++ Map.empty
      // turn them into JSON
      val parsedHeaders = new JsObject(
            headers.keys.tail.map((k) =>               // we take the tail of map.keys because the head is (null,HTTP status)
              (k.replaceAll("-",""),                   // strip hyphens from the keys because those aren't valid JSON names
               Json.toJson(headers.get(k).get.head)))  // take the head of map.get(k) because the map value is List[String]
               toSeq)
      // read the remote response body
      val body = Source.fromInputStream(conn.getContent.asInstanceOf[InputStream]).mkString("")
      // parse it and merge it with the JSONized headers
      val mbody = parsedHeaders ++ new JsObject(List("body" -> Json.parse(body)).toSeq)
      // build a MongoDB document
      val mdbo = new MongoDBObject(mbody.value.map((k) => (k._1,Json.stringify(k._2))))
      coll += mdbo // and write it
      Ok(mbody).as("application/json")
    }
}