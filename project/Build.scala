import sbt._
import Keys._
import PlayProject._

object ApplicationBuild extends Build {

    val appName         = "LslSensorProxy"
    val appVersion      = "1.0-SNAPSHOT"

    val appDependencies = Seq(
      // Add your project dependencies here,
      "org.mongodb" %% "casbah" % "2.4.1"
    )

    val main = PlayProject(appName, appVersion, appDependencies, mainLang = SCALA).settings(
      // Add your own project settings here
      resolvers += "Scala-Tools Maven2 Release Repository" at "http://scala-tools.org/repo-releases"
    )

}
