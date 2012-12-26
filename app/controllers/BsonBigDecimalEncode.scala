package controllers

import org.bson.{ BSON, Transformer }
import com.mongodb.casbah.commons.conversions.MongoConversionHelper

// hack based on https://groups.google.com/forum/#!msg/mongodb-casbah-users/Yb0VXxT0UFI/3DSU1B9Sb4QJ
trait BsonBigDecimalEncode extends MongoConversionHelper {

 private val encode = new Transformer {
    def transform(o: AnyRef): AnyRef = o match {
      case bd : BigDecimal =>  o.asInstanceOf[BigDecimal].floatValue().asInstanceOf[AnyRef]
      case _ => o
    }
  }

  override def register() = {
    BSON.addEncodingHook(classOf[scala.math.BigDecimal], encode)
    super.register() // <-- this is important if you want to setup a chain of transformers in one declaration
  }

 override def unregister() = {
   BSON.removeEncodingHooks(classOf[BigDecimal])
    super.unregister()
  }
}

object BsonBigDecimalSupport extends BsonBigDecimalEncode {
  def apply() = {
    super.register()
  }
}