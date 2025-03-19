import TelegramBot from 'node-telegram-bot-api';
import { CronJob } from 'cron';
import { enviroment } from './config/enviroment.js';
import { commands } from './commands/index.js';

import { eventsMessage } from './events/events.js';

const token = enviroment.TOKEN_TELEGRAM;
const bot = new TelegramBot(token, { polling: true });
let awaitingPriceResponse = new Set();

let messageIds = [];
let alertPrices = [];

bot.on('message', (msg) => eventsMessage(bot, msg, messageIds, awaitingPriceResponse));
bot.onText(/\/start/, (msg) => commands.start(bot, msg, messageIds));
bot.onText(/\/price/, (msg) => commands.price(bot, msg, messageIds, awaitingPriceResponse));
bot.onText(/\/clear/, (msg) => commands.clear(bot, msg, messageIds));
bot.onText(/\/alert (\d+)/, (msg, match) => commands.alert(bot, msg, match, alertPrices));
const job = new CronJob('*/5 * * * *', () => {
  commands.checkAlerts(bot, alertPrices)
});
job.start();

console.log('Bot de Telegram iniciado...');