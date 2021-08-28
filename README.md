# ICHNT (Unmaintained discord user bot)  

UnmaintainedD Discord User Bot.    

As user bots are against discord's TOS this project is not longer maintained to work with the newer changes that break user bot. Repo is being public to give ideas, act as a source of inspiration for some of its old but entertaining features.  


## Features 


__***User Profile Manipulation***__

**playing [message]**  
-Sets a custom playing message  
**watching [message]**  
-Sets a custom wathcing message  
**listening [message]**  
-Sets a custom listening message   
**streaming [message]**  
-Sets a custom streaming message  
**antimate-stauts**  
-Starts a staus animation (online,idle,busy)  
**unanimate-status**  
-DIsables a status animation after it has been started  


__***Messages and More***__  

**autorespond [message]**  
- When enabled  sends this message to anyone who dms  
+disabled by just autrorespond  

**mountai **  
-Mounts AI to your DMs, if autorespond is enabled only autorespond will happen
the name can be changed using set  

**antidelete dm / [WEBHOOK URL]**  
-Sets up antidelete. If dm is given it sends back deleted messages to the same dm if a webhook url is given it sends the deleted messages to that channel in the server  

**antiedit dm/[WEBHOOK URL]**  
-Sets up antiedit. Same as antidelete setting up antiedit on dms is not recommend make a channel in a server and use webhook  

**snapshot [DISCORD MESSAGE LINK] [name]**  
-Saves a message as a snap shot with a name and sends that whenever name is called. eg sharingan  

___*** Utility & Misc ***___  

**forever-type [channel id]**   
-starts forever typing at a channel id, forver type in that channel is stopped by calling this command for that channel id  

**animate-username [guildID]**  
-starts a rotating username spree with the usernames provided using the set command  

**emote [guilID]**  
-downloads ALL emoji on a server to the /emotes folder  

__*** Configuraton ***___  
**set twitch [name]**  
-sets the twitch handle people will go to when they click watch  

**set usernames [comma seperated usernames]**  
-sets the usernames that will be used when rotating usernames are enabled  

**set ainame [OneWordName]**  
-sets the name for the AI to respond and give out  
