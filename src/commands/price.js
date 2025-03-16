import { getBitcoinPrice } from "../utils/api.js";
import { sendMessage } from "../utils/telegram.js";

export const priceCommand = async (bot, message, messageIds) => {
  const chatId = message.chat.id;
  const price = await getBitcoinPrice();
  const response = price ? 
      `El precio de Bitcoin es:  ${price.toString().replace('.', '\\.')} USDT` : 
    'No se pudo obtener el precio de Bitcoin';
  
  sendMessage(bot, chatId, response, messageIds);
}