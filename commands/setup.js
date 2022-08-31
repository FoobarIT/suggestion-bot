/**
 * This command auto setting the bot.
 */
const {PermissionsBitField, ChannelType} = require('discord.js')
const models = require('../models/')
module.exports = {
    name: 'setup',
    execute: async (client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply('You are not a administrator.')

        if (message.guild.channels.cache.find(c => c.name === 'suggestion-logs')) return message.reply('Sorry this channel name has been already created.')
        if (message.guild.roles.cache.find(r => r.name === 'operator')) return message.reply('Sorry this roles already exists')        
        // Check if setup is already exist for this guild.
        let setupExist = await models.Guild.findOne({where: {guildId: message.guild.id}})
        if (setupExist) return message.reply('_This guild already have an bot setup, use command `!backup` and retry.._') 
        
        
        // Create new channel to logs users suggestions.
        await message.guild.channels.create({
            name: `suggestion-logs`,
            type: ChannelType.GuildText,
            permissionOverwrites: [{
                id: message.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel]
            }]
        })
        // Create new role to manually interact wiht users suggestions
        await message.guild.roles.create({
            name: 'operator',
            // Temp role administrator
            permissions: [PermissionsBitField.Flags.Administrator]
        })

        // Find created channel infos.
        const CREATED_CHANNEL_INFO = message.guild.channels.cache.find(channel => channel.name === 'suggestion-logs');
        // Find created role infos
        const CREATED_ROLE_INFO = message.guild.roles.cache.find(roles => roles.name === 'operator')

        try {
            await models.Guild.create({
                guildId: message.guild.id,
                userId: message.author.id,
                channelId: CREATED_CHANNEL_INFO.id,
                roleId: CREATED_ROLE_INFO.id
            })
        } catch(err) {
            throw new Error(`DATABASE can't create this settings: ${err}`)
        }
    }
}
    