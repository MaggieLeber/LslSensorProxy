
string URL = "";
string locationStatus()
{
    vector position = llGetPos();
    vector rota     = llRot2Euler(llGetRot());
    string text = vsList2JSON([  "region",llGetRegionName(),
                                 "fps",llGetRegionFPS(), 
                                 "td",llGetRegionTimeDilation(),
                                 "memfree",llGetFreeMemory(),
                                 "parcel",llList2String(llGetParcelDetails(position,[PARCEL_DETAILS_NAME]),0),
                                 "pflags",llGetParcelFlags(position),
                                 "pos",position,
                                 "rot",rota, 
                                 "agents",(key)getAgentsJSON(),
                                 "url",URL
                             ]); 
    return text;
}

string getAgentData(key agentKey) {
    string agentData = vsList2JSON([  "key", (string)agentKey,
                                      "name",llList2String(llGetObjectDetails(agentKey,[OBJECT_NAME]),0),
                                      "pos",llList2Vector(llGetObjectDetails(agentKey,[OBJECT_POS]),0),
                                      "rot",llList2Rot(llGetObjectDetails(agentKey,[OBJECT_ROT]),0),
                                      "vel",llList2Vector(llGetObjectDetails(agentKey,[OBJECT_VELOCITY]),0),
                                      "stat",llGetAgentInfo(agentKey)
                                    ]);   
    return agentData;
}

string getAgentsJSON() {
    string agentJSON = "[";
    list agentKeys = llGetAgentList(AGENT_LIST_REGION, []);
    integer lengthOfList = llGetListLength(agentKeys);
    integer index;
    do
    {
    agentJSON += getAgentData(llList2Key(agentKeys,index)) + ",";
    }
    while (++index < lengthOfList);
    agentJSON = llGetSubString(agentJSON,0,-2)+ "]";
    return agentJSON;
}    


// http://wiki.secondlife.com/wiki/User:Vegas_Silverweb/LSL_to_JSON

string vsList2JSON(list input) {
list labels;
if(llGetListLength(input) % 2 != 0) {
    llSay(DEBUG_CHANNEL,"vsList2JSON must be a 2-strided list!");
    return "{}";}
 
string sTemp = "{";
integer i;
for(i=0;i<llGetListLength(input);i+=2) {
string label = llList2String(input,i);
sTemp += "\""+label+"\":";
integer entryType = llGetListEntryType(input,i+1);
if(entryType>2 && entryType!=4)
    sTemp=sTemp+"\""+llList2String(input,i+1)+"\""; else
    if(entryType==2)
    sTemp=sTemp+(string)llList2Float(input,i+1); else
    if(entryType==1)
    sTemp=sTemp+(string)llList2Integer(input,i+1); else
    if(entryType==4)
    sTemp=sTemp+llList2String(input,i+1);
    if(llGetListLength(input)>i+2) sTemp=sTemp+",";
}
 
sTemp += "}";
return sTemp;
}

string vsList2JSONArray(list input) {
string sTemp = "[";
integer i;
for(i=0;i<llGetListLength(input);i++) {
integer entryType = llGetListEntryType(input,i);
if(entryType==3)
    sTemp=sTemp+"\""+llList2String(input,i)+"\""; else
    if(entryType==2)
    sTemp=sTemp+(string)llList2Float(input,i); else
        if(entryType==4)
    sTemp=sTemp+(string)llList2String(input,i); else
    sTemp=sTemp+(string)llList2Integer(input,i);
    if(llGetListLength(input)>i+1) sTemp=sTemp+",";
}
sTemp += "]";
return sTemp;
}

default
{
    state_entry()
    {
        llRequestURL();
        llSay(0, locationStatus());
    }
 
    http_request(key id, string method, string body)
    {
        if (method == URL_REQUEST_GRANTED) {
            llSay(0,"URL: " + body);
            llInstantMessage(llGetOwner(),body + locationStatus());
            URL = body;
        }
        else if (method == URL_REQUEST_DENIED) {llSay(0, "Something went wrong, no url. " + body);}
        else if (method == "GET")              {llHTTPResponse(id,200,locationStatus());}
        else                                   {llHTTPResponse(id,405,"Unsupported Method");
        }
    }

    touch_start(integer total_number)
    {
        llSay(0, locationStatus());
    }
}
