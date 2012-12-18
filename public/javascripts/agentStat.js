function agentStat(bitflags) {
    AGENT_ALWAYS_RUN	= 0x1000;  // has running ("Always Run") enabled, or is using tap-tap-hold
    AGENT_ATTACHMENTS	= 0x0002;  // has attachments
    AGENT_AUTOPILOT		= 0x2000;  // is in "autopilot" mode
    AGENT_AWAY	    	= 0x0040;  // is in "away" mode
    AGENT_BUSY	    	= 0x0800;  // is in "busy" mode
    AGENT_CROUCHING		= 0x0400;  // is crouching
    AGENT_FLYING		= 0x0001;  // is flying or hovering
    AGENT_IN_AIR		= 0x0100;  // is in the air (jumping, flying or falling)
    AGENT_MOUSELOOK		= 0x0008;  // is in mouselook
    AGENT_ON_OBJECT		= 0x0020;  // is sitting on an object (and linked to it)[1]
    AGENT_SCRIPTED		= 0x0004;  // has scripted attachments
    AGENT_SITTING		= 0x0010;  // is sitting
    AGENT_TYPING		= 0x0200;  // is typing
    AGENT_WALKING	    = 0x0080;  // is walking running or crouch walking

}