function agentStat(bitflags) {
    var html                = "";
    var AGENT_ALWAYS_RUN	= 0x1000;  // has running ("Always Run") enabled, or is using tap-tap-hold "icon-share-alt"
    var AGENT_ATTACHMENTS	= 0x0002;  // has attachments  "icon-tag"
    var AGENT_AUTOPILOT		= 0x2000;  // is in "autopilot" mode "icon-plane icon-white"
    var AGENT_AWAY	    	= 0x0040;  // is in "away" mode "icon-eye-close"
    var AGENT_BUSY	    	= 0x0800;  // is in "busy" mode "icon-time"
    var AGENT_CROUCHING		= 0x0400;  // is crouching  "icon-chevron-down"
    var AGENT_FLYING		= 0x0001;  // is flying or hovering  "icon-plane"
    var AGENT_IN_AIR		= 0x0100;  // is in the air (jumping, flying or falling) "icon-arrow-up"
    var AGENT_MOUSELOOK		= 0x0008;  // is in mouselook "icon-eye-open"
    var AGENT_ON_OBJECT		= 0x0020;  // is sitting on an object (and linked to it) "icon-arrow-down icon-white"
    var AGENT_SCRIPTED		= 0x0004;  // has scripted attachments  "icon-file"
    var AGENT_SITTING		= 0x0010;  // is sitting "icon-arrow-down"
    var AGENT_TYPING		= 0x0200;  // is typing  "icon-comment"
    var AGENT_WALKING	    = 0x0080;  // is walking running or crouch walking  "icon-arrow-right"

    if ( (bitflags & AGENT_ALWAYS_RUN  ) > 0 ) { html += "<i title=\"running\" class=\"icon-share-alt\"></i>"; }
    if ( (bitflags & AGENT_ATTACHMENTS ) > 0 ) { html += "<i title=\"attachments\"  class=\"icon-tag\"></i>";}
    if ( (bitflags & AGENT_AUTOPILOT   ) > 0 ) { html += "<i title=\"autopilot\"  class=\"icon-plane icon-white\" style=\"background-color:black\"></i>";}
    if ( (bitflags & AGENT_AWAY        ) > 0 ) { html += "<i title=\"away\" class=\"icon-eye-close\"></i>";}
    if ( (bitflags & AGENT_BUSY        ) > 0 ) { html += "<i title=\"busy\" class=\"icon-time\"></i>";}
    if ( (bitflags & AGENT_CROUCHING   ) > 0 ) { html += "<i title=\"crouching\" class=\"icon-chevron-down\"></i>";}
    if ( (bitflags & AGENT_FLYING      ) > 0 ) { html += "<i title=\"flying\" class=\"icon-plane\"></i>";}
    if ( (bitflags & AGENT_IN_AIR      ) > 0 ) { html += "<i title=\"in air\" class=\"icon-arrow-up\"></i>";}
    if ( (bitflags & AGENT_MOUSELOOK   ) > 0 ) { html += "<i title=\"mouselook\" class=\"icon-eye-open\"></i>";}
    if ( (bitflags & AGENT_ON_OBJECT   ) > 0 ) { html += "<i title=\"sitting on object\" class=\"icon-arrow-down icon-white\" style=\"background-color:black\"></i>";}
    if ( (bitflags & AGENT_SCRIPTED    ) > 0 ) { html += "<i title=\"scripted attachments\" class=\"icon-file\"></i>";}
    if ( (bitflags & AGENT_SITTING     ) > 0 ) { html += "<i title=\"sitting\" class=\"icon-arrow-down\"></i>";}
    if ( (bitflags & AGENT_TYPING      ) > 0 ) { html += "<i title=\"typing\" class=\"icon-comment\"></i>";}
    if ( (bitflags & AGENT_WALKING     ) > 0 ) { html += "<i title=\"walking\" class=\"icon-arrow-right\"></i>";}
    return html;
}
