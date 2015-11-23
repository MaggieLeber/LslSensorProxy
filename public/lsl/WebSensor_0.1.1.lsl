string version = "0.1.1";
string author = "Maggie Darwin [Maggie Leber maggie@matrisync.com>]";
string URL = "";

string FormatDecimal(float number, integer precision) // http://wiki.secondlife.com/wiki/Format_Decimal
{
    float roundingValue = llPow(10, -precision)*0.5;
    float rounded;
    if (number < 0) rounded = number - roundingValue;
    else            rounded = number + roundingValue;

    if (precision < 1) // Rounding integer value
    {
        integer intRounding = (integer)llPow(10, -precision);
        rounded = (integer)rounded/intRounding*intRounding;
        precision = -1; // Don't truncate integer value
    }

    string strNumber = (string)rounded;
    return llGetSubString(strNumber, 0, llSubStringIndex(strNumber, ".") + precision);
}

list vectorRound(vector input, integer digits)
{
        list result = [ FormatDecimal(input.x, digits),FormatDecimal(input.y, digits), FormatDecimal(input.z, digits) ];
        return result;
    }

string locationStatus()
{
    vector position = llGetPos();
    vector rota     = llRot2Euler(llGetRot());
    string text =
     llList2Json(JSON_OBJECT,
                              [
                                "name",llGetObjectName(),
                                "desc",llGetObjectDesc(),
                                "region",llGetRegionName(),
                                "url",URL,
                                  "v",version,
                                 "fps",llGetRegionFPS(),
                                 "td",llGetRegionTimeDilation(),
                                 "memfree",llGetFreeMemory(),
                                 "parcel",llList2String(llGetParcelDetails(position,[PARCEL_DETAILS_NAME]),0),
                                 "pflags",llGetParcelFlags(position),
                                 "pos",position,
                                 "rot",rota,
                                 "agents",getAgentsJSON()
                              ]);
    return text;
}

string getAgentData(key agentKey) {
    list details =  llGetObjectDetails(agentKey,[OBJECT_NAME, OBJECT_POS, OBJECT_ROT, OBJECT_VELOCITY]);
    string agentData =  llList2Json(JSON_ARRAY,
                                   [  "key", (string)agentKey,
                                      "name",llList2String(details,0),
                                      "pos",llList2Vector(details,1),
                                      "rot",llList2Rot(details,3),
                                       "vel",llList2Vector(details,4),
                                      "stat",llGetAgentInfo(agentKey)
                                    ]);
    return agentData;
}

string getAgentsJSON() {
    list agentDataList = [];
    list agentKeys = llGetAgentList(AGENT_LIST_REGION, []);
    integer lengthOfList = llGetListLength(agentKeys);
    integer index;
    do
    {
    agentDataList += getAgentData(llList2Key(agentKeys,index));
    }
    while (++index < lengthOfList);
    return llList2Json(JSON_ARRAY,agentDataList);
}

default
{
    state_entry()
    {
        llRequestURL();
        llOwnerSay(locationStatus());
    }

    http_request(key id, string method, string body)
    {
        if (method == URL_REQUEST_GRANTED) {
            llSay(0,"URL: " + body);
            URL = body;
        }
        else if (method == URL_REQUEST_DENIED) {llSay(0, "Something went wrong, no url. " + body);}
        else if (method == "GET")              {llHTTPResponse(id,200,locationStatus());}
        else                                   {llHTTPResponse(id,405,"Unsupported Method");
        }
    }

    touch_start(integer total_number)
    {
        llOwnerSay(locationStatus());
    }
}
