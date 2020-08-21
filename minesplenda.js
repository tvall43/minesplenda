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

bot.on('chat', function (username, message) {
  if (username === bot.username) return
  bot.chat(message)
})

// Log errors and kick reasons:
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('error', err => console.log(err))

client.on("ready", async =>{
  console.log("discord")
  client.user.setPresence({
        status: "online",  //You can show online, idle....
        game: {
            name: "Minecraft, duh",  //The message shown
            type: "PLAYING:" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
  });
})

client.on('message', message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'timeset') {
        if(!message.member.roles.cache.some(r=>["Administrator", "Moderator"].includes(r.name)))
          return message.reply("Sorry, you don't have permissions to use this!");

	if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	bot.chat(`/time set ${args}`);
  }
  else if (command === 'kick') {
        if(!message.member.roles.cache.some(r=>["Administrator", "Moderator"].includes(r.name)))
          return message.reply("Sorry, you don't have permissions to use this!");

        if (!args.length) {
                return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        bot.chat(`/kick ${args}`);
  }
  else if (command === 'ban') {
        if(!message.member.roles.cache.some(r=>["Administrator", "Moderator"].includes(r.name)))
          return message.reply("Sorry, you don't have permissions to use this!");

        if (!args.length) { 
                return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        bot.chat(`/ban ${args}`);
  }
  else if (command === 'teleport') {
        if(!message.member.roles.cache.some(r=>["Administrator", "Moderator"].includes(r.name)))
          return message.reply("Sorry, you don't have permissions to use this!");

        if (!args.length) { 
                return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        const tpStuff = args.join(" ");
        bot.chat(`/tp ` + tpStuff);
  }
  else if (command === 'say') {
        if(!message.member.roles.cache.some(r=>["Administrator", "Moderator"].includes(r.name)))
          return message.reply("Sorry, you don't have permissions to use this!");

        if (!args.length) { 
                return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        const sayMessage = args.join(" ");
        bot.chat(`/say ` + sayMessage);
  }


  else if (command === 'minesplenda') {
        message.channel.send(`im alive`);
  }

});

client.login('token')
