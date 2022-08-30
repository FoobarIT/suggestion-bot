/**
 * suggestion-bot
 * A bot that suggests things to do
 * @author: @FoobarIT
 * @license: MIT
 * @version: 1.0.0
 * @repository: to define 
 **/

const Discord = require('discord.js');
const {GatewayIntentBits, Collection} = require('discord.js');
const { token} = require('./bot-config')
const fs = require('fs');
const path = require('path');

// Create an instance of a Discord client and define Intents
const client = new Discord.Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
    ] 

});

// New command collection
client.commands = new Collection();

const init = async () => {

    // Then we load events, which will include our message and ready event.
    client.events = {}
    fs.readdir('./events', (err, files) => {
        try {
            files.forEach(file => {
                var eventName = file.split('.')[0]
                var prop = require(`./events/${file}`)
    
                client.events[eventName] = prop
                client.on(eventName, prop.bind(null, client))
            })
        } catch (err) {
            console.log(err)
        }
    })

    // Load all commands files from the commands folder
    const commands = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    
    // Login to Discord with your client's token
    client.login(token);
}
init();