require('dotenv').config();

const responseChannelID = process.env.RESPONSE_CHANNEL_ID;

module.exports = (message, client) => {
  const { content } = message;
  message.reply('Записав! :)');
  client.channels.cache.get(responseChannelID)
    .send(`Ось повідомлення від @${message.author.username}: 
${content}`);
  // if (content.includes('Грогу')) {
  //   message.reply('Записав! :)');
  //   client.channels.cache.get(responseChannelID)
  //     .send(`Ось тижневе повідомлення від @${message.author.username}:
  //     ${content.replace(/Грогу(,)?( +)?(\n)?/gim, '')}`);
  // }
};
