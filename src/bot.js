import TelegramBot from 'node-telegram-bot-api';
import { enviroment } from './config/enviroment';
import { commands } from './commands';
import { sendMessage } from './utils/sendMessage';
import { errorMessage, notCommandMessage } from './utils/messages';

const token = enviroment.TOKEN_TELEGRAM;
const bot = new TelegramBot(token, { polling: true });
let messageIds = [];

bot.onText(/\/start/, (msg) => commands.start(bot, msg, messageIds));
bot.onText(/\/price/, (msg) => commands.price(bot, msg, messageIds));
bot.onText(/\/clear/, (msg) => commands.clear(bot, msg, messageIds));

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text && text.startsWith('/')) {
    const command = text.slice(1).split(' ')[0].split('@')[0].toLowerCase();
    if (!validCommands.includes(command)) {
      sendMessage(bot, chatId, errorMessage(welcomeMessage), messageIds);
    }
  } else if (text) {
    sendMessage(bot, chatId, notCommandMessage(welcomeMessage), messageIds);
  }
});

console.log('Bot de Telegram iniciado...');