const Discord = require('discord.js');
const client = new Discord.Client();
const mineflayer = require('mineflayer');
//const config = require('./config.json');

var prefix = "!";
const bot = mineflayer.createBot({
  host: '127.0.0.1', // optional
  port: 25577,       // optional
  username: 'user@gmail.com', // email and password are required only for
  password: 'N0t4R3aLpA$$',          // online-mode=true servers
  version: '1.16.1'                 // false corresponds to auto version detection (that's the default), put for example "1.8.8" if you need a specific version
})

var commands = {
  "timeset": "time set",
  "teleport": "tp",
  "kick": "kick",
  "ban": "ban",
  "say": "say"
};

bot.on('chat', function (username, message) {
  if (username === bot.username) return;
  bot.chat(message)
})

// Log errors and kick reasons:
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('error', err => console.log(err))

client.on("ready", async =>{
  console.log("discord")
})

client.on('message', message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (!args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}
  if (commands[command] != undefined) {
    bot.chat(`/${commands[command]} ${args}`);
  }
});

client.login('token')
