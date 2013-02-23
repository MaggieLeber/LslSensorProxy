LslProxy -- MaggieL's first actual PlayFramework and Scala toy
==============================================================

I'm writing this during my vacation to learn Scala and PlayFramework.

The basic idea: Scripted objects in the [Second Life](http://secondlife.com) virtual world are programmable
in a primitive scripting language called _Linden Scripting Language_, (LSL).

These scripts are capable of sending and receiving rudimentary HTTP data,
although you have little control over the MIME type of the payloads.

The scripts can do calls to the VW server in which they are running,
to sense the state of the virtual world around them, and the health of the server itself.
Since the scripts are embedded in in-world objects, they are capable of acting as mobile agents.
There is also useful data automatically added as headers on HTTP responses.

But, since from within LSL you have almost no control over the reponse headers,
you can't really write a proper RESTful webservice for this data. In particular there's no ability to
issue `Access-Control-Allow-Origin` to allow the service to be accessed cross-domain. Sooooo...

This toy project creates a webservice that proxies in-world sensors, and merges data from
the sensor payload with data from the response headers, and presents it as a unified JSON response.

There is also a simple HTML UI that uses jQuery to call the service, and three.js to do a 3D representation
of spatially-arranged data from the sensors.

Right now, the proxy simply records the sensor data in a MongoDB collection. I'm looking forward
to using this with the new `play.api.libs.json` library in Play 2.1 (currently still in RC1 status) and the ReactiveMongo
plug-in Real Soon Now.

At the moment, the senor identity is hardcoded in the HTML UI. Obvious future enhancements will include
provisions for sensors to register themselves with the server and automated variable-rate polling for data.

I've learned a boat-load of Scala (and three.js) doing this. Fun stuff.

The raw sensor data body currently looks like:

``` {
    "region" : "Harrington",
    "fps" : 44.876180,
    "td" : 0.985122,
    "memfree" : 44248,
    "parcel" : "Matrisync East",
    "pflags" : 1040188491,
    "pos" : "<211.322600, 239.690000, 8.132746>",
    "rot" : "<0.000000, 0.000000, 0.785398>",
    "agents" :
       [
          {
             "key" : "5804624b-71d3-4f52-9efb-7eaf19bd0810",
             "name" : "TAGS Resident",
             "pos" : "<229.017000, 87.879600, 3806.801000>",
             "rot" : "<0.000000, 0.000000, -0.077652, 0.996981>",
             "vel" : "<0.000000, 0.000000, 0.000000>",
             "stat" : 6
          },
          {
             "key" : "488baf73-8442-4ca1-b98d-28dfcbfa6457",
             "name" : "Thaddeus Sautereau",
             "pos" : "<217.608400, 89.089170, 3000.905000>",
             "rot" : "<0.000000, 0.000000, -0.999958, 0.009141>",
             "vel" : "<0.000000, 0.000000, 0.000000>",
             "stat" : 6
          }
       ],
    "url" : "http://sim6140.agni.lindenlab.com:12046/cap/68a8c0da-b68d-89df-b133-3bce3a667e62"
 }
```

And is accompanied by headers, thus:

```    Server:Server: Second Life LSL/Second Life Server 13.02.08.270166 (http://secondlife.com)
       X-SecondLife-Local-Position:(211.322556, 239.690033, 8.132746)
       X-SecondLife-Local-Rotation:(0.000000, 0.000000, 0.382683, 0.923880)
       X-SecondLife-Local-Velocity:(0.000000, 0.000000, 0.000000)
       X-SecondLife-Object-Key:99eaa9d0-ce87-4f5c-8f32-eacd1804cb01
       X-SecondLife-Object-Name:Web Sensor Prototype
       X-SecondLife-Owner-Key:79709685-7bbd-43b4-9341-00d7fa81c449
       X-SecondLife-Owner-Name:Maggie Darwin
       X-SecondLife-Region:Harrington (173056, 285440)
       X-SecondLife-Shard:Production
```

