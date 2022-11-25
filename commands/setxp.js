const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Setear los puntitos al usuario",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "5s",

    minArgs: 1,
    maxArgs: 2,
    expectedArgs: "<Puntos> <Usuario>",
    options: [
        {
            name: "puntos",
            description: "Puntos solo para setear",
            required: true,
            type: 10
        },
        {
            name: "usuario",
            description: "Seleccionar el usuario",
            required: false,
            type: 6
        }
    ],

    callback: async ({ args, guild, interaction, user }) => {
        await interaction.deferReply()

        if (args[1]) {
            xp.setXP(args[1], guild.id, args[0]).then((res) => {
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
            xp.setXP(user.id, guild.id, args[0]).then((res) => {
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