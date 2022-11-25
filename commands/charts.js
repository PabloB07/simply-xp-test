const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Ver el Gráfico",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "5s",

    minArgs: 0,
    maxArgs: 3,
    expectedArgs: "<Background> <Posicion> <Tipo>",
    options: [
        {
            name: "background",
            description: "Background HEX Code",
            required: false,
            type: 3
        },
        {
            name: "posicion",
            description: "Cuenta de Usuario",
            required: false,
            type: 10
        },
        {
            name: "tipo",
            description: "Seleccionar tipo",
            required: false,
            type: 3,
            choices: [
                {
                    name: "Bar Chart",
                    value: "bar"
                },
                {
                    name: "Doughnut Graph",
                    value: "doughnut"
                },
                {
                    name: "Line Graph",
                    value: "line"
                },
                {
                    name: "Pie Chart",
                    value: "pie"
                },
                {
                    name: "Polar Area Chart",
                    value: "polarArea"
                },
                {
                    name: "Radar Chart",
                    value: "radar"
                }
            ]
        }
    ],

    callback: async ({ interaction }) => {
        await interaction.deferReply()

        xp.charts(interaction, {
            position: interaction.options.getNumber("position") || null,
            background: interaction.options.getString("background") || null,
            type: interaction.options.getString("type") || null
        }).then((res) => {
            interaction.editReply({
                embeds: [{
                    title: "Result of Function",
                    description: "VIEW CHART IN THE ATTACHMENT",
                    image: { url: "attachment://chart.png" }
                }], files: [res]
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