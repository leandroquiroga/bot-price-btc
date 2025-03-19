import { getPrice } from "../utils/api.js";
import { pricePromptMessage, invalidCryptoMessage } from "../utils/messages.js";
import { sendMessage } from "../utils/telegram.js";

export const priceCommand = async (bot, message, messageIds, awaitingPriceResponse) => {
  const chatId = message.chat.id;
  awaitingPriceResponse.add(chatId);
  sendMessage(bot, chatId, pricePromptMessage, messageIds);
}


export const handlePriceResponse = async (bot, message, text, messageIds) => {
  const chatId = message.chat.id;
  const crypto = text.trim().replace('/', '');
  console.log(crypto)
  try {
    const price = await getPrice(bot, chatId, messageIds, crypto);
    const response = `El precio de ${crypto} es:  ${price.toString().replace('.', '\\.')} USDT` 
    sendMessage(bot, chatId, response, messageIds);
  } catch (error) {
    const messageError = invalidCryptoMessage
    sendMessage(bot, chatId, messageError, messageIds);
    
  }
}