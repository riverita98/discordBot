var express = require('express');
var bodyParser = require('body-parser');

const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const prefix = "/";

//Si el mensaje proviene de un bot se obvia

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    // Se separa el comando y argumentos divididos por espacio
    const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

});

client.login(config.BOT_TOKEN);

/*
var app = express();
var port = process.env.PORT || 3525;

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
    console.log('Defined routes:');
    console.log('	[GET] http://localhost:3525/');
});

*/