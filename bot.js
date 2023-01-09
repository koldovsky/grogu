const Discord = require('discord.js');
const schedule = require('node-schedule');
const publishStatus = require('./status');

require('dotenv').config();

const client = new Discord.Client();

const botID = process.env.BOT_ID;
const statusRequestChannelID = process.env.REQUEST_CHANNEL_ID;

client.login(process.env.BOT_TOKEN);

const prefix = '!';

const doStatusRequest = () => {
  client.channels.cache.get(statusRequestChannelID).send(`@everyone 
  Як пройшов твій тиждень?
  Що корисного ти вивчив(-ла)/зробив(-ла)?
  Які плани на наступний тиждень?
  ----------------------------
  Приклад відповіді:
  Грогу, Тиждень пройшов насичено, вивчив декілька нових ліб до Vue.js.
  Весь наступний тиждень буду правити баги.
  ("Грогу" - обов'язково)`);
}

client.on('ready', () => {
  console.log('Grogu is ready!');
  //https://crontab.guru/
  schedule.scheduleJob('0 9 * * 1', doStatusRequest);
});

client.on('message', (message) => {
  // console.log(JSON.stringify(message));

  if (message.author.bot) return;

  if (message.mentions.users.get(botID) !== undefined) {
    publishStatus(message, client);
  }

  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'ready') {
    message.reply('yes');
  } else if (command === 'status') {
    doStatusRequest();
  } else if (command === 'time') {
    message.reply(new Date().toString());
  } else if (command === 'nice') {
    message.reply('Thanks');
  } else if (command === 'count') {
    const numArgs = args.map((item) => +item);
    const sum = numArgs.reduce((a, b) => a + b, 0);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  } else if (command === 'run') {
    const code = args.join(' ');
    try {
      const evaled = eval(code);
      message.replay(evaled);
    } catch (err) {
      message.reply(`Error: ${err.message}`);
    } 
  }
});
