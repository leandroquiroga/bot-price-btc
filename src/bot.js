import TelegramBot from 'node-telegram-bot-api';
import { enviroment } from './config/enviroment.js';
import { validCommands } from './config/configuration.js';
import { commands } from './commands/index.js';
import { sendMessage } from './utils/telegram.js';
import { errorMessage, notCommandMessage, welcomeMessage } from './utils/messages.js';

const token = enviroment.TOKEN_TELEGRAM;
const bot = new TelegramBot(token, { polling: true });
let messageIds = [];

bot.onText(/\/start/, (msg) => commands.start(bot, msg, messageIds));
bot.onText(/\/price/, (msg) => commands.price(bot, msg, messageIds));
bot.onText(/\/clear/, (msg) => commands.clear(bot, msg, messageIds));

bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  try {
    
    if (text && text.startsWith('/')) {
      const command = text.slice(1).split(' ')[0].split('@')[0].toLowerCase();
      if (!validCommands.includes(command)) {
        const errMsg = errorMessage(welcomeMessage)
        await sendMessage(bot, chatId, errMsg, messageIds);
      }
    } else if (text) {
      const commandInvalid = notCommandMessage(welcomeMessage)
      await sendMessage(bot, chatId, commandInvalid, messageIds);
    }
  } catch (error) {
    console.log('Error al procesar el mensaje:', error);
    await sendMessage(bot, chatId, 'Error al procesar el mensaje', messageIds);
  }
});

console.log('Bot de Telegram iniciado...');