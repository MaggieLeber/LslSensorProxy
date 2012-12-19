function showsensor(data) {
         var html = "<div> " + "<table>";
         html += "<tr><td>At:</td><td>"+data.Date+"</td></tr>";
         html += "<tr><td>Sensor:</td><td>"+data.XSecondLifeObjectName+"</td></tr>";
         html += "<tr><td>at:</td><td>"+data.XSecondLifeLocalPosition+"</td></tr>";
         html += "<tr><td>Region:</td><td>"+ data.body.region+"</td></tr>";
         html += "<tr><td>Parcel:</td><td>"+data.body.parcel+"</td></tr>";
         html += "<tr><td>sim frames/sec :</td><td>"+ data.body.fps+"</td></tr>";
         html +=     "<tr><td>time dilation:</td><td>"+ data.body.td +"</td></tr>";
         html +=    "<tr><td>parcel flags:</td><td>" +data.body.pflags+"</td></tr>";
         html += "</table>" + "</div>";

    html += "<h4>Agents in region</h4>"
    html += "<table class=\"table table-striped table-bordered\">" +
        "<thead><tr><th>Name</th><th>position</th><th>rotation</th><th>velocity</th></tr></thead>";
    for (i=0;i<data.body.agents.length;i++){
         html += "<tr>";
         html += "<td title=\""+data.body.agents[i].key+"\"><i class=\"icon-user\"></i>"+
             data.body.agents[i].name+" "+agentStat(data.body.agents[i].stat);
         html += "<td>"+data.body.agents[i].pos+"</td>";
         html += "<td>"+data.body.agents[i].rot+"</td>";
         html += "<td>"+data.body.agents[i].vel+"</td>";
         html += "</tr>";
         }
    html += "</table>";
    return html;
}