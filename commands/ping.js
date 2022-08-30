/**
 * Simple test command durin project structure.
 */
module.exports = {
    name : 'ping',
    run : async (client, message, args) => {
        message.channel.send('Pong.');
    }
};

