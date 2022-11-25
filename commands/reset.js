const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Resetear las stats del usuario",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "5s",

    minArgs: 0,
    maxArgs: 1,
    expectedArgs: "<Usuario>",
    options: [
        {
            name: "usuario",
            description: "Seleccionar un usuario",
            required: false,
            type: 6
        }
    ],

    callback: async ({ guild, interaction, user }) => {
        await interaction.deferReply()

        xp.reset(interaction.options.getUser("user")?.id || user.id, guild.id).then((res) => {
            interaction.editReply({
                embeds: [{
                    title: "Result of Function",
                    description: JSON.stringify(res) || "Nothing Returned (Something Probably Went Wrong)",
                    color: res ? "GREEN" : "ORANGE"
                }]
            })
        }).catch((err) => {
            interaction.editReply({
                embeds: [{
                    title: "Result of Function",
                    description: err.toString().substring(0, 1024),
                    color: "RED"
                }]
            })
        })
    }
}