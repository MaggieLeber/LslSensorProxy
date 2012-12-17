function showsensor(data) {
         var html = "<div> At: "+data.Date+"</div>";
         html += "<div> Sensor: "+data.XSecondLifeObjectName+"</div>";
         html += " at: "+data.XSecondLifeLocalPosition;
         html += " in: "+data.body.parcel;
    html += "</div>";
    html += "<div> Agents:";
    for (i=0;i<data.body.agents.length;i++){
         html += "<div style=\"width : 600px; border: aqua; border-width: 2px; border-style: groove\">";
         html += data.body.agents[i].name+" ("+data.body.agents[i].key+")";
         html += "<div> pos: "+data.body.agents[i].pos+"</div>";
         html += "<div> rot: "+data.body.agents[i].rot+"</div>";
         html += "<div> vel: "+data.body.agents[i].vel+"</div>";
         html += "<div> stat: "+data.body.agents[i].stat+"</div>";
         html += "</div>";
         }
    html += "</div>";
    return html;
}