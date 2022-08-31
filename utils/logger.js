
const log = (client, channelId, type, findingSuggest, authorSuggest, trace) => {
    // This type is only manually action.
    if (type === 'accept') {
        // return client.channels.cache.get(`${channelId}`).send(
        //     `Suggestion Accepted: 
        //     *Trace Similarity Rating:* _benchmark:\`0.8\`_
        //     `            
        // )
    }
    // This type can be reject by bot and manually. 
    else if (type === 'reject') {
        return client.channels.cache.get(`${channelId}`).send(
            `**[Suggestion Rejected 📤]**\n_Reason:_ \`The bot has determined a similarity based on our other suggestions.\`\n_Author:_ \`${authorSuggest.author.nickname}\`\n_Suggestion:_ \`${authorSuggest.author.content}\`\n**[Trace]**\n_Author:_ \`${findingSuggest.nickname}\`\n_Suggestion:_ \`${findingSuggest.suggest}\`\n**[Rating]**\n_Benchmark:_ \`Score >= 0.4\`\n_Score:_ \`${trace}\``)
    } 
}

module.exports = log