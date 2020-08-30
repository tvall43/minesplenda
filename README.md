# terrible bot written for splenda to handle some admin stuff in vanilla minecraft
 
## the crappy idea:
lower level admins on the server dont get op, but get permission to chat with this bot. by sending messages to bot, bot will react by running whatever command.
current idea is to have the bot present in discord, and react to messages in an admin only room.

my code is also crap

## what actually ended up being written:
uses mcchat2 to communicate with the server. bot passes messages to stdin of the mcchat process
level of permissions based on user roles in discord
thanks to Alvarito050506 for cleanup and making my spaghetti code much less spaghetti-like

## how to use:
if you're crazy enough to use this yourself, i didn't make it easy, but i didnt make it intentionally hard.
 
- clone repo
- npm install discord.js
- have a copy of mcchat2 in ../src/mcchat2/ (or edit the line with that)
- edit config.json with discord token, minecraft credentials, and prefix
- node minesplenda.js
- cross fingers?

## extra
### why this extra?
someone on discord didnt like my lack of markdown, and made a comment on no one using h6. so i rectified both
### splenda
he wanted some permission levels on his pure vanilla minecraft server, and this is the best i came up with as a workable, "vanilla" solution
#### Vanilla
minecraft, but with 0 mods of any kind. just the jar mojang releases and nothing more
##### mojang
the awesome team that does the amazing job of maintaining java edition
###### java edition
the superior version of minecraft, in an inferior language compared to the inferior version*
###### *
java is a vm, so there is a performance hit. BUT. it means basically free linux support
#### splendas name
he goes by SugarD-x, but hes also quite bitter, so he cant be real sugar. ive called him splenda because of this as far back as he can remember, but he won't accept it
