function agentStat(bitflags) {
    AGENT_ALWAYS_RUN	= 0x1000;  // has running ("Always Run") enabled, or is using tap-tap-hold "icon-share-alt"
    AGENT_ATTACHMENTS	= 0x0002;  // has attachments  "icon-tag"
    AGENT_AUTOPILOT		= 0x2000;  // is in "autopilot" mode "icon-plane icon-white"
    AGENT_AWAY	    	= 0x0040;  // is in "away" mode "icon-eye-close"
    AGENT_BUSY	    	= 0x0800;  // is in "busy" mode "icon-time"
    AGENT_CROUCHING		= 0x0400;  // is crouching  "icon-chevron-down"
    AGENT_FLYING		= 0x0001;  // is flying or hovering  "icon-plane"
    AGENT_IN_AIR		= 0x0100;  // is in the air (jumping, flying or falling) "icon-arrow-up"
    AGENT_MOUSELOOK		= 0x0008;  // is in mouselook "icon-eye-open"
    AGENT_ON_OBJECT		= 0x0020;  // is sitting on an object (and linked to it) "icon-arrow-down icon-white"
    AGENT_SCRIPTED		= 0x0004;  // has scripted attachments  "icon-file"
    AGENT_SITTING		= 0x0010;  // is sitting "icon-arrow-down"
    AGENT_TYPING		= 0x0200;  // is typing  "icon-comment"
    AGENT_WALKING	    = 0x0080;  // is walking running or crouch walking  "icon-arrow-right"

}