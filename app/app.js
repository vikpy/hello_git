
const restify = require("restify");
const botbuilder = require("botbuilder");
const fs = require('fs');  


// const options = {  
//     key: fs.readFileSync('./server_key.pem', 'utf8'),  
//     certificate: fs.readFileSync('./server.pem', 'utf8')  
// }; 

//options
//Setting up restify server 
const server = restify.createServer(); 
server.listen(
//port 
3978, 

//callback
() => {
	console.log(`${server.name} listening to ${server.url}`);
}
);

//Create chat connector for communication with the bot framework 
const adapter = new botbuilder.BotFrameworkAdapter({
	appId : process.env.SKYPE_BOT_ID_SVC, 
	appPassword : process.env.SKYPE_BOT_PASSWORD_SVC
});




server.post('/foodiebot', (req, res) => {
    // Use the adapter to process the incoming web request into a TurnContext object.
    adapter.processActivity(req, res, async (turnContext) => {
        // Do something with this incoming activity!
        if (turnContext.activity.type === 'message') {            
            // Get the user's text
            const utterance = turnContext.activity.text;
 
            // send a reply
            await turnContext.sendActivity(`I heard you say ${ utterance }`);
        }
    });
});