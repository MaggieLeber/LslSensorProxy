package controllers

import java.net.URL
import java.io.InputStream
import play.api.libs.json.{JsString, Json, JsObject}
import play.api.mvc.{Action, Controller}

import scala.collection.immutable._
import collection.JavaConversions._
import scala.io.Source


object Application extends Controller {

  def harrington = Action { Ok(views.html.harrington()) }

  /**
    * If
    *
    * GET http://sim10276.agni.lindenlab.com:12046/cap/0f3fb4f2-0692-05a5-3537-d9c021ab2516 returned
    * {
    *      "name": "Matrisync Oculea Mast",
    *      "desc": "(No Description)",
    *      "region": "Oculea",
    *      "url": "http://sim10276.agni.lindenlab.com:12046/cap/0f3fb4f2-0692-05a5-3537-d9c021ab2516",
    *      "v": "0.1.2",
    *      "fps": 44.839531,
    *      "td": 0.99265,
    *      "memfree": 12983,
    *      "parcel": "Matrisync Oculea",
    *      "pflags": 1040187435,
    *      "pos": "<66.069710, 237.557190, 65.431183>",
    *      "rot": "<0.003491, 0.003491, -3.094468>",
    *      "agents": [
    *      {
    *      "key": "79709685-7bbd-43b4-9341-00d7fa81c449",
    *      "name": "Maggie Darwin",
    *      "pos": "<70.571304, 236.903885, 51.715824>",
    *      "rot": "<0.000000, 0.000000, 0.000000, 1.000000>",
    *      "vel": "<0.000000, 0.000000, 0.000000>",
    *      "stat": 54
    *      }
    *      ]
    *      }
    *
    *
    * This endpoint would return:
    *
    * GET http://localhost:9000/sensor/10276/12046/0f3fb4f2-0692-05a5-3537-d9c021ab2516 returned
    * {
    * "desc": "(No Description)",
    * "name": "Matrisync Oculea Mast",
    * "Server": "Second Life LSL/Second Life Server 15.11.13.307797 (http://secondlife.com)",
    * "url": "http://sim10276.agni.lindenlab.com:12046/cap/0f3fb4f2-0692-05a5-3537-d9c021ab2516",
    * "rot": "<0.003491, 0.003491, -3.094468>",
    * "pos": "<66.069710, 237.557190, 65.431183>",
    * "pflags": 1040187435,
    * "XSecondLifeRegion": "Oculea (257280, 259840)",
    * "agents": [
    * {
    * "key": "79709685-7bbd-43b4-9341-00d7fa81c449",
    * "name": "Maggie Darwin",
    * "pos": "<70.571304, 236.903885, 51.715824>",
    * "rot": "<0.000000, 0.000000, 0.000000, 1.000000>",
    * "vel": "<0.000000, 0.000000, 0.000000>",
    * "stat": 54
    * }
    * ],
    * "Connection": "close",
    * "fps": 45.069256,
    * "td": 0.999628,
    * "XSecondLifeObjectKey": "f2cc128c-6f06-1336-4fa1-9c985030fd51",
    * "v": "0.1.2",
    * "XSecondLifeOwnerName": "Maggie Darwin",
    * "memfree": 12983,
    * "parcel": "Matrisync Oculea",
    * "XSecondLifeOwnerKey": "79709685-7bbd-43b4-9341-00d7fa81c449",
    * "Pragma": "no-cache",
    * "region": "Oculea",
    * "ContentLength": "581",
    * "Date": "Sun, 29 Nov 2015 20:21:12 GMT",
    * "XSecondLifeObjectName": "Matrisync Oculea Mast",
    * "XSecondLifeLocalPosition": "(66.069710, 237.557190, 65.431183)",
    * "XSecondLifeLocalRotation": "(-0.001704, 0.001786, -0.999719, 0.023563)",
    * "XSecondLifeLocalVelocity": "(0.000000, 0.000000, 0.000000)",
    * "CacheControl": "no-cache, max-age=0",
    * "ContentType": "text/plain; charset=utf-8",
    * "XSecondLifeShard": "Production"
    * }
    *
    * @param sim
    * @param port
    * @param cap
    * @return
    */
  def sensor(sim: String, port: String, cap: String) =
    Action {
      // connect to the remote scripted object in-world
      val conn = new URL("http://sim"+sim+".agni.lindenlab.com:"+port+"/cap/"+cap).openConnection()
      //todo: handle connection errors
      // the headers are a (mutable) Java Map; convert to scala.collection.immutable.Map
      val headers = conn.getHeaderFields.toMap ++ Map.empty
      // then turn them into JSON
      val parsedHeaders = new JsObject(headers.tail.map(e => (e._1.replaceAll("-",""),JsString(e._2.head))))
      val body = Source.fromInputStream(conn.getContent.asInstanceOf[InputStream]).mkString("")
      // then parse it, and merge it with the JSONized headers
      val mbody : JsObject =  parsedHeaders ++ Json.parse(body).asInstanceOf[JsObject]
      Ok(mbody).as("application/json") // then return the merged JSON payload to our caller
    }
}