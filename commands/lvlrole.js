const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Provee niveles de rolas (si es que hay po)",

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

    callback: async ({ args, guild, interaction, user }) => {
        await interaction.deferReply()

        if (args[1]) {
            xp.lvlRole(interaction, args[0], guild.id).then((res) => {
                interaction.editReply({
                    embeds: [{
                        title: "Result of Function",
                        description: "simply-xp does not provide an output for this function!",
                        color: "GREEN"
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
        } else {
            xp.lvlRole(interaction, user.id, guild.id).then((res) => {
                interaction.editReply({
                    embeds: [{
                        title: "simply-xp does not provide an output for this function!",
                        description: JSON.stringify(res),
                        color: "GREEN"
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
}