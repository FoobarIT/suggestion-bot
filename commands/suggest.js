

const models = require('../models/')

module.exports = {
    name: 'suggest',
    execute: async (client, message, args) => {
        if (!args.length) return message.reply(`You didn't provide any suggestion, ${message.author}!`);

        
        const temp = await models.Suggest.findAll()
        //console.log(temp)

        let getSuggest = args.slice(0, args.length).join(' ') 
        if (getSuggest.length < 40) return message.reply(`Be more specific in your suggestion, ${message.author}!`)

        await message.react('📥').then(message.react('📤'))
        
        client.on('messageReactionAdd', async (reaction, user) => {
            const GET_ADMIN_ROLE = await message.guild.roles.cache.get('1014276555922485318').members.map(m => m.user.id);
            if (GET_ADMIN_ROLE.includes(user.id)) {
                if (reaction.emoji.name === '📥') {
                    try {
                        await models.Suggest.create({
                            userId: message.author.id,
                            nickname: message.author.username,
                            suggest: getSuggest
                        })
                    } catch (e) {
                        throw new Error('Impossible to create suggest data:', e)
                    }
                    return message.reply(`Your suggest has been accepted by a administrator, ${message.author}.`)
                } else if (reaction.emoji.name === '📤') {
                    return message.reply(`Your suggestion has been rejected by a aministrator, ${message.author}.`)
                }
            }
        })
    }
}