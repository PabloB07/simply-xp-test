const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Seleccionar roles",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "5s",
    options: [
        {
            name: "add",
            description: "Añadir un rol",
            options: [
                {
                    name: "nivel",
                    description: "Para tener un rol debes tener niveles",
                    required: true,
                    type: 10
                },
                {
                    name: "rol",
                    description: "El rol a tener",
                    required: true,
                    type: 8
                }
            ], type: 1
        },
        {
            name: "remove",
            description: "Remover un rol del nivel",
            options: [
                {
                    name: "nivel",
                    description: "Nivel requerido para obtener un rol",
                    required: true,
                    type: 10
                }
            ], type: 1
        },
        {
            name: "fetch",
            description: "Fetch Niveles de roles",
            type: 1
        },
        {
            name: "find",
            description: "Encontrar roles por nivel",
            options: [
                {
                    name: "nivel",
                    description: "Nivel requerido para tener un rol",
                    required: true,
                    type: 10
                }
            ], type: 1
        },
    ],

    callback: async ({ client, interaction, guild }) => {
        await interaction.deferReply()

        switch (interaction.options.getSubcommand()) {
            case "add":
                xp.roleSetup.add(client, guild.id, {
                    level: interaction.options.getNumber("nivel"),
                    role: interaction.options.getRole("rol").id
                }).then((res) => {
                    interaction.editReply({
                        embeds: [{
                            title: "Result of Function",
                            description: JSON.stringify(res) || "Nada, hay un error, cuentaselo a un Admin o Developer!",
                            color: res ? "GREEN" : "ORANGE"
                        }]
                    })
                }).catch((err) => {
                    console.log(err)
                    interaction.editReply({
                        embeds: [{
                            title: "Result of Function",
                            description: err.toString().substring(0, 1024),
                            color: "RED"
                        }]
                    })
                }); break
            case "find":
                xp.roleSetup.find(client, guild.id, interaction.options.getNumber("level")).then((res) => {
                    interaction.editReply({
                        embeds: [{
                            title: "Result of Function",
                            description: JSON.stringify(res) || "Nada, hay un error, cuentaselo a un Admin o Developer!",
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
                }); break
            case "fetch":
                xp.roleSetup.fetch(client, guild.id).then((res) => {
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
                }); break
            case "remove":
                xp.roleSetup.remove(client, guild.id, { level: interaction.options.getNumber("level") }).then((res) => {
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
                }); break
            default:
                interaction.editReply({
                    embeds: [{
                        title: "Como llegate acá, oe?",
                        description: "Intentelo denuevo mas tarde..",
                        color: "RED"
                    }]
                }); break
        }
    }
}