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

