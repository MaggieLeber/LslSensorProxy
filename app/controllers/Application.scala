package controllers

import play.api.mvc._
import java.net.URL
import io.Source
import java.io.InputStream
import play.api.libs.json._
import scala.collection.immutable._
import collection.JavaConversions._
import com.mongodb.casbah.Imports._
import play.api.libs.json.JsObject


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
      // the headers are a (mutable) Java Map; convert to scala.collection.immutable.Map
      val headers = conn.getHeaderFields.toMap ++ Map.empty
      // then turn them into JSON
      val parsedHeaders = new JsObject(
        // take the tail of map.keys because the head is (null,HTTP status) and map it
        headers.keys.tail.map(
          (k) =>
            // strip hyphens from the keys because those aren't valid JSON names
          (k.replaceAll("-",""),
            // take the head of headers.get(k) because the map value is List[String] as the JSON values
            Json.toJson(headers.get(k).get.head)
                             )          // end the mapped function
                                      ) // end the .map call
          toSeq) // make it a Seq and end the JsObject constructor call
      // read the remote response body
      val body = Source.fromInputStream(conn.getContent.asInstanceOf[InputStream]).mkString("")
      // then parse it, and merge it with the JSONized headers
      val mbody : JsObject =  parsedHeaders ++ Json.parse(body).asInstanceOf[JsObject]
      // build a MongoDB document from it
      val mdbo = new MongoDBObject(
        mbody.value.map ((k) =>
          (k._1,
            k._2 match {
              case n : JsNumber => n.value
              case s : JsString => s.value
              case a : JsArray  => a.value
              case _            => "Oops"+ k._2.toString()
            }
            )))
      coll += mdbo // and write that to the DB
      Ok(mbody).as("application/json") // then return the merged JSON payload to our caller
    }
}