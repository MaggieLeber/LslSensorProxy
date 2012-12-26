function showsensor(data) {
         var html = "<div> " + "<table>";
         html += "<tr><td>At:</td><td>"+data.Date+"</td></tr>";
         html += "<tr><td>Sensor:</td><td>"+data.XSecondLifeObjectName+"</td></tr>";
         html += "<tr><td>at:</td><td>"+data.XSecondLifeLocalPosition+"</td></tr>";
         html += "<tr><td>Region:</td><td>"+ data.region+"</td></tr>";
         html += "<tr><td>Parcel:</td><td>"+data.parcel+"</td></tr>";
         html += "<tr><td>sim frames/sec :</td><td>"+ data.fps+"</td></tr>";
         html +=     "<tr><td>time dilation:</td><td>"+ data.td +"</td></tr>";
         html +=    "<tr><td>parcel flags:</td><td>" +data.pflags+"</td></tr>";
         html += "</table>" + "</div>";

    html += "<h4>Agents in region</h4>"
    html += "<table class=\"table table-striped table-bordered\">" +
        "<thead><tr><th>Name</th><th>position</th><th>rotation</th><th>velocity</th></tr></thead>";
    for (i=0;i<data.agents.length;i++){
         html += "<tr>";
         html += "<td title=\""+data.agents[i].key+"\"><i class=\"icon-user\"></i>"+
             data.agents[i].name+" "+agentStat(data.agents[i].stat);
         html += "<td>"+data.agents[i].pos+"</td>";
         html += "<td>"+data.agents[i].rot+"</td>";
         html += "<td>"+data.agents[i].vel+"</td>";
         html += "</tr>";
         }
    html += "</table>";
    return html;
}