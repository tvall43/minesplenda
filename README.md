# terrible bot written for splenda to handle some admin stuff in vanilla minecraft
 
## the crappy idea:
lower level admins on the server dont get op, but get permission to chat with this bot. by sending messages to bot, bot will react by running whatever command.
current idea is to have the bot present in discord, and react to messages in an admin only room.

my code is also crap

## what actually ended up being written:
uses mcchat2 to communicate with the server. bot passes messages to stdin of the mcchat process.
level of permissions based on user roles in discord.
thanks to Alvarito050506 for cleanup and making my spaghetti code much less spaghetti-like.

## how to use:
if you're crazy enough to use this yourself, i didn't make it easy, but i didnt make it intentionally hard.
 
- clone repo
- npm install discord.js and cron
- have a copy of mcchat2 in ../src/mcchat2/ (or edit the config)
- edit config.json with discord token, minecraft credentials, and prefix
- node minesplenda.js
- cross fingers?
