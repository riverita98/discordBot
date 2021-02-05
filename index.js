var express = require('express');
var bodyParser = require('body-parser');

const Discord = require("discord.js");
const config = require("./config.json");

//const client = new Client({ ws: { intents: ['GUILDS', 'GUILD_MEMBERS'] } });
const client = new Discord.Client({ intents: ['GUILD_PRESENCES', 'GUILD_MEMBERS'] });
const prefix = "/";

//inicio de sesion
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});



client.on("message", async function (message) {
    //Si el mensaje proviene de un bot se obvia

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    // Se separa el comando y argumentos divididos por espacio
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply();
    }

    if (command === "event") {

        console.log("Enviando MD sobre evento");

        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(toString(args));

        message.reply("ENVIANDO NOTIFICACIONES SOBRE EVENTO");
        message.guild.members.fetch()
            .then(e => {
                console.log(e);
                const memberList = e.toJSON();
                memberList.forEach(member => {
                    client.users.fetch(member['userID']).then(user => {

                        if (member['displayName'] != "GypsyBot" && member['displayName'] != "BoobBot™"
                            && member['displayName'] != "Groovy" && member['displayName'] != "Casino") {
                            console.log(member['displayName'] + "-" + member['userID']);

                            user.send(toString(args));
                        }

                    })
                });
                message.reply("NOTIFICACIONES DE EVENTO ENVIADAS CORRECTAMENTE");
            })
            .catch(console.error);
    }

});

client.login(config.BOT_TOKEN);



function toString(arr) {
    result = "";
    arr.forEach(element => {
        result += " " + element;
    });
    return result;
}




