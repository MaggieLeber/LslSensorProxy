package controllers

import play.api.mvc._
import java.net.URL
import io.Source
import java.io.InputStream
import play.api.libs.json.{JsString, Json, JsObject}
import scala.collection.immutable._
import collection.JavaConversions._

object Application extends Controller {

  def harrington = Action {
    Ok(views.html.harrington())
  }


  // http://localhost:9000/sensor/6140/12046/f71ec7b9-64dc-20b3-327c-5a0e4f81b42f
  def sensor(sim: String, port: String, cap: String) =
    Action {
      // connect to the remote scripted object in-world
      val conn = new URL("http://sim"+sim+".agni.lindenlab.com:"+port+"/cap/"+cap).openConnection()
      //todo: handle connection errors
      // parse the headers - it's a mutable Java Map; make it scala.collection.immutable.Map
      val headers = conn.getHeaderFields.toMap ++ Map.empty
      def headerParse(map: Map[java.lang.String, java.util.List[java.lang.String]]): JsObject = {
        return new JsObject(
          // we take the tail of map.keys because the first key is null with a value of the HTTP status
          // we take the head of map.get(k) because the map value is a List[String]
          // strip out the hyphens from the keys because those aren't valid JSON
          map.keys.tail.map((k) => (k.replaceAll("-",""), JsString(map.get(k).get.head))).toList
        )
      }
      // read the remote response body
      val body = Source.fromInputStream(conn.getContent.asInstanceOf[InputStream]).mkString("")
      // parse it and merge it with the JSONized headers
      val mbody = headerParse(headers) ++ new JsObject(List("body" -> Json.parse(body)).toSeq)
      Ok(mbody).as("application/json")
    }
}