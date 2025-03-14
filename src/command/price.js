import { getBitcoinPrice } from "../utils/api";
import { sendMessage } from "../utils/telegram";

export const priceCommand = async (bot, message, messageIds) => {
  const chatId = message.chat.id;
  const price = await getBitcoinPrice();
  const message = price ? 
      `El precio de Bitcoin es: ${price} USDT` : 
    'No se pudo obtener el precio de Bitcoin';
  
  sendMessage(bot, chatId, message, messageIds);
}