const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Añadir experiencia",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "5s",

    minArgs: 1,
    maxArgs: 3,
    expectedArgs: "<Experiencia> <Usuario> <Max Experiencia>",
    options: [
        {
            name: "exp",
            description: "Cantidad de Exp a añadir",
            required: true,
            type: 10
        },
        {
            name: "usuario",
            description: "Seleccionar un usuario",
            required: false,
            type: 6
        },
        {
            name: "max",
            description: "Max Exp para añadir",
            required: false,
            type: 10
        }
    ],

    callback: async ({ args, guild, interaction, user }) => {
        const choices = interaction.options
        await interaction.deferReply()

        if (choices.getNumber('max')) {
            xp.addXP(interaction, choices.getUser("user")?.id || user.id, guild.id, {
                min: choices.getNumber("exp"),
                max: choices.getNumber("max")
            }).then((res) => {
                interaction.editReply({
                    embeds: [{
                        title: "Result of Function",
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
        } else {
            xp.addXP(interaction, args[1] || user.id, guild.id, args[0]).then((res) => {
                interaction.editReply({
                    embeds: [{
                        title: "Result of Function",
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