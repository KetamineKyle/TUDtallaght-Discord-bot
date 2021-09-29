let tokens = require('./token');
global.mongodb = tokens.mongodb;
global.discord = tokens.discord;
global.botid = tokens.botid;

let bot = require('./botSrc');

// Loads the users discordId into cache for a set ammount of time
// it also creates a link for the user to be able to click which 
// prompts them to log in with their school email.
//
// discordId - String - the users actual uniqe discord ID
function createConfirmationRequest(discordId) {

}