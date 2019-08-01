const TelegramBot = require('node-telegram-bot-api');

const request = require('request')

const token = '897165861:AAHJHsFyCd6MIqqgnrf_l5gpuKofvteJ5PM';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/course/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Valyuta - Qanday Valyuta sizni qiziqtirdi ?', {
      reply_markup: {
          inline_keyboard: [ 
              [
                  {
                      text: "Evro", 
                      callback_data: "EUR"
                  },
                  {
                    text: "AQSH dollari", 
                    callback_data: "USD"
                },
                  {
                    text: "Rosiiya rubli", 
                    callback_data: "RUB"
                },
                {
                    text: "Qozog'iston tengesi", 
                    callback_data: "KZT"
                }
              ]
          ]
      }
  })
});

bot.on('callback_query', query =>{
    var id = query.message.chat.id;

    request('https://nbu.uz/uz/exchange-rates/json/', function(error, response, body) {
        const data = JSON.parse(body);
        const result = data.filter(item => item.code === query.data)[0];

            const flag = {
                'EUR': '🇪🇺',
                'USD': '🇺🇸',
                'RUB': '🇷🇺',
                'UZB': '🇺🇿',
                'KZT': '🇰🇿'
            }

        let md = `
            *${flag[result.code]} ${result.code} 💱 UZB 🇺🇿*
            Olish: _${result.cb_price}_
            Sotish: _${result.nbu_buy_price}_
        `;
            bot.sendMessage(id, md, {parse_mode: 'Markdown'});
    })
})

 
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, 'Received your message');
// });