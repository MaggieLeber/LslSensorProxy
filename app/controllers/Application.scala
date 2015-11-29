package controllers

import java.net.URL
import java.io.InputStream
import play.api.libs.json.{JsString, JsValue, Json, JsObject}
import play.api.mvc.{Action, Controller}

import scala.collection.immutable._
import collection.JavaConversions._
import scala.io.Source


object Application extends Controller {
  //todo: automatic sensor registration
  // val mongoConn = MongoConnection()
  // val coll = mongoConn("lslproxy")("sensordata")
  // BsonBigDecimalSupport() // register our BSON encoder

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
        headers.tail.map(e => (e._1.replaceAll("-",""),JsString(e._2.head))))
      val body = Source.fromInputStream(conn.getContent.asInstanceOf[InputStream]).mkString("")
      // then parse it, and merge it with the JSONized headers
      val mbody : JsObject =  parsedHeaders ++ Json.parse(body).asInstanceOf[JsObject]
      // build a MongoDB document from it
//      val mdbo = new MongoDBObject(
//        mbody.value.map ((k) =>
//          (k._1,
//            k._2 match {
//              case n : JsNumber => n.value
//              case s : JsString => s.value
//              case a : JsArray  => a.value
//              case _            => "Oops"+ k._2.toString()
//            }
//            )))
//      coll += mdbo // and write that to the DB
      Ok(mbody).as("application/json") // then return the merged JSON payload to our caller
    }
}