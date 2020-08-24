
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
});

var commands = {


  //mod +
  "timeset": ["time set", 1],
  "teleport": ["tp", 1],
  "kick": ["kick", 1],
  "gamemode": ["gamemode", 1],

  /*admin+ stuff*/

  "ban": ["ban", 2],
  "say": ["say", 2],
  "pardon": ["pardon", 2],
  "ban-ip": ["ban-ip", 2],
  "pardon-ip": ["pardon-ip", 2]
};


/* real roles, add before mineflayer update. should be in correct order

Server Owner
Division leader (MC:VS)
Manager (MC:VS)
Administrator (MC:VS)
Moderator (MC:VS)
Developer (MC:VS)

*/

var lvl_names = ["everyone", "Moderator", "Administrator", "Owner"];

bot.on('chat', function (username, message) {
  if (username === bot.username) return;
  bot.chat(message)
});

// Log errors and kick reasons:
bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn));
bot.on('error', err => console.log(err));

client.on("ready", async =>{
  console.log("discord");
  client.user.setPresence({
        status: "online",  //You can show online, idle....
  });
  client.user.setActivity('Minecraft, duh', { type: 'PLAYING' });
});

client.on('message', message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (!args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

  if (command === 'minesplenda') {
    message.channel.send(`im alive`);
  } else {
    var cache = message.member.roles.cache;

    if (commands[command] != undefined) {
    /* "Cuts" the `lvl_names` array from `commands[command][1]` to the end. Example: For the "ban" command, the returned array would be `["Administrator", "Owner"]`. */
      var tmp_lvl = lvl_names.slice(commands[command][1]);

      if (!cache.some(r => tmp_lvl.includes(r.name))) {
        return message.reply("Sorry, you don't have permissions to use this!");
      } else
      {
        var commaless = args.join(" ");
        bot.chat(`/${commands[command][0]} ${commaless}`);
      }
    }
  }
});

client.login('token')
