import sbt._
import Keys._
// import PlayProject._
import play.Project._

object ApplicationBuild extends Build {

    val appName         = "LslSensorProxy"
    val appVersion      = "1.0-SNAPSHOT"

    val appDependencies = Seq(

       javaCore, javaJdbc, javaEbean,
      // Add your project dependencies here,
      "org.mongodb" %% "casbah" % "2.5.0"

    )

    val main = play.Project(appName, appVersion, appDependencies).settings(
      // Add your own project settings here
//      resolvers += "Scala-Tools Maven2 Release Repository" at "http://scala-tools.org/repo-releases"
      resolvers += "Sonatype" at "https://oss.sonatype.org/content/repositories/releases"
    )

}
