/**
 * Simple messageCreate event handler
 * 
 */

const config = require('../bot-config');

module.exports = (client, message) => {
        // Ignore all bots
        if (message.author.bot) return;
        if (message.content.indexOf(config.prefix) !== 0) return;

        // Get the command name and the args
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        
        // Get the commands collection
        const cmd = client.commands.get(command);
        if (!cmd) return;
    
        // Run the command
        cmd.execute(client, message, args);
};