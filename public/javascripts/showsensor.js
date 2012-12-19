function showsensor(data) {
         var html = "<div> At: "+data.Date+" ";
         html += " Sensor: "+data.XSecondLifeObjectName;
         html += " at: "+data.XSecondLifeLocalPosition;
         html += " in: "+ data.body.region + " region, parcel "+data.body.parcel;
         html += " sim frames/sec : "+ data.body.fps + " time dilation: "+ data.body.td + " parcel flags: " +data.body.pflags;
    html += "</div>";
    html += "<h4>Agents in region</h4>"
    html += "<table class=\"table table-striped table-bordered\">" +
        "<thead><tr><th>Name(Key)</th><th>position</th><th>rotation</th><th>velocity</th><th>status</th></tr></thead>";
    for (i=0;i<data.body.agents.length;i++){
         html += "<tr>";
         html += "<td><i class=\"icon-user\"></i>"+data.body.agents[i].name;
         html += "("+data.body.agents[i].key+")</td>";
         html += "<td>"+data.body.agents[i].pos+"</td>";
         html += "<td>"+data.body.agents[i].rot+"</td>";
         html += "<td>"+data.body.agents[i].vel+"</td>";
         html += "<td>"+agentStat(data.body.agents[i].stat)+"</td>";
         html += "</tr>";
         }
    html += "</table>";
    return html;
}