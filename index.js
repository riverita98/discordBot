const service = require('./service');

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

    if (command === "enable") {
        service.remove(message.author.id);
        console.log("usuario activado");
    }
    else if (command ==="disable"){
        service.insert(message.author.id);
        console.log("usuario desactivado");

    }

    else if (command === "event") {

        console.log("Enviando MD sobre evento");


        message.reply(toString(args));

        message.reply("ENVIANDO NOTIFICACIONES SOBRE EVENTO");
        message.guild.members.fetch()
            .then(async e => {

                const memberList = e.toJSON();
                memberList.forEach(async member => {
                  await  client.users.fetch(member['userID']).then(async user => {
                        if (member['displayName'] != "GypsyBot" && member['displayName'] != "BoobBot™"
                            && member['displayName'] != "Groovy" && member['displayName'] != "Casino") {
                            const res = await service.get(member['userID']);
                            if (res==false) {
                                user.send(toString(args)).then(console.log(`MENSAJE ENVIADO A ${member['displayName']}:\n `)).catch(e => { console.log(`ERROR AL ENVIAR MENSAJE A ${member['displayName']}:\n ${e}`) });
                            }
                        }

                    }).catch(console.error);
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




