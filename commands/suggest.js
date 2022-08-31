const models = require('../models/')
const levenshtein = require('../utils/levenshtein')

module.exports = {
    name: 'suggest',
    execute: async (client, message, args) => {
        if (!args.length) return message.reply(`You didn't provide any suggestion, ${message.author}!`);

        let getSuggest = args.slice(0, args.length).join(' ') 
        if (getSuggest.length < 25) return message.reply(`Be more specific in your suggestion, ${message.author}!`)
        
        let guild = message.guild.id
        try {
            let getAllSuggest = await models.Suggest.findAll({where: {guildId: guild}})
            if (getAllSuggest.length > 0) {
                getAllSuggest.forEach(async (suggest) => {
    
                    let similarity = levenshtein(getSuggest, suggest.suggest)
                    console.log(similarity)
                    if (similarity > 0.8) return message.reply(
                        `Sorry the bot has determined that your suggestion has already been proposed by **${suggest.nickname}**, ${message.author}!\n**[Trace]:** _Rating ${similarity}._`)
                })
            }
            console.log(getSuggest)
        } catch(err) {
            console.log(err)
        }

        await message.react('📥').then(message.react('📤'))
        
        client.on('messageReactionAdd', async (reaction, user) => {
            const GET_ADMIN_ROLE = await message.guild.roles.cache.get('1014276555922485318').members.map(m => m.user.id);
            if (GET_ADMIN_ROLE.includes(user.id)) {
                if (reaction.emoji.name === '📥') {
                    try {
                        await models.Suggest.create({
                            guildId: message.guild.id,
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