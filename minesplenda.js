const { Client, Intents, MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const cron = require('cron');
const fs = require('fs')
const child_proc = require('child_process');
var prefix = config.prefix;

var mcvs = (str) => `${str} (MC:VS)`;
var no_perms = (msg) => msg.reply('Sorry, you don\'t have permissions to use this!');
var is_dev = (msg) => msg.member.roles.cache.some(r => [mcvs`Developer`].includes(r.name));

var commands = {
  // Mod +
  'timeset': ['time set', 2],
  'teleport': ['tp', 2],
  'kick': ['kick', 2],
  'survival': ['gamemode survival', 2],
  'spectate': ['gamemode spectator', 2],
  // Admin +
  'ban': ['ban', 3],
  'say': ['say', 3],
  'pardon': ['pardon', 4],
  'ban-ip': ['ban-ip', 3],
  'pardon-ip': ['pardon-ip', 4],
  'creative': ['gamemode creative', 5],
  // Owner?
  'op': ['op', 7]
};

var lvl_names = [
  'everyone',
  mcvs`Developer`,
  mcvs`Moderator`,
  mcvs`Administrator`,
  mcvs`Manager`,
  mcvs`Division leader`,
  'Community Leader',
  'Server Owner'
];

var mcchatProc = child_proc.spawn('python3', ['-u', config.mcchatpath, config.mcserver, config.mcuser, config.mcpass]);
var mccchat_send = (str) => mcchatProc.stdin.write(str + '\n');
console.log('mcchat child');

mcchatProc.stdout.on('data', (data) => {
  console.log(`mcchat: ${data}`);
  fs.appendFile('log.txt', data, (err) => {
    if (err) throw err;
  });
  if (data.indexOf('Players online:') >= 0) {
    mccchat_send('/gamemode spectator minesplenda');
  }
});

let websiteAd = new cron.CronJob('0 */22 * * * *', () => {
  mccchat_send('/tellraw @a "Check out our website!"');
  mccchat_send('/tellraw @a "www.asshatgaming.com"');
  console.log('Fired website ad.');
});

let discordAd = new cron.CronJob('0 */18 * * * *', () => {
  mccchat_send('/tellraw @a "Chat with us on Discord!"');
  mccchat_send('/tellraw @a "discord.asshatgaming.com"');
  console.log('Fired Discord ad.');
});

client.on('ready', async => {
  console.log('discord');
  client.user.setPresence({
    status: 'online',  // You can show online, idle....
  });
  client.user.setActivity('Minecraft, duh', { type: 'PLAYING' });
  discordAd.start();
  websiteAd.start();
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot || message.guild === null) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (!args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

  var commaless = args.join(' ');

  if (command === 'minesplenda') {
    message.channel.send(`I'm alive`);
  } else if (command === 'gamemode') {
    if (!is_dev()) {
      return no_perms(message);
    }
    mccchat_send(`/gamemode ${args[0]} ${args[1]}`);
    console.log(`${message.author.tag} /gamemode ${commaless}`);
  } else if (command === 'uploadlog') {
    if (!is_dev()) {
      return no_perms(message);
    }
    message.channel.send(`${message.author},`, new MessageAttachment('log.txt'));
  } else {
    var cache = message.member.roles.cache;

    if (commands[command] != undefined) {
      /* "Cuts" the `lvl_names` array from `commands[command][1]` to the end.
       * Example: For the "ban" command, the returned array would be `["Administrator", "Owner"]`.
       */
      var tmp_lvl = lvl_names.slice(commands[command][1]);

      if (!cache.some(r => tmp_lvl.includes(r.name))) {
        return no_perms(message);
      } else {
        mccchat_send(`/${commands[command][0]} ${commaless}`);
        console.log(`${message.author.tag} /${commands[command][0]} ${commaless}`);
      }
    }
  }
});

client.login(config.token);
