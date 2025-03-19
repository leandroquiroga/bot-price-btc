import { handlePriceResponse } from "../commands/price.js";
import { validCommands } from "../config/configuration.js";
import { errorMessage, notCommandMessage, welcomeMessage } from "../utils/messages.js";
import { sendMessage } from "../utils/telegram.js";

const validText = (text) => text && text.startsWith('/');
const command = (text) => text.slice(1).split(' ')[0].split('@')[0].toLowerCase();
const isUserAndValidText = (text, awaitingPriceResponse, chatId) => text && awaitingPriceResponse.has(chatId);
 
export const eventsMessage = async (bot, msg, messageIds, awaitingPriceResponse) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  try {

    if (validText(text)) {
      if (!validCommands.includes(command(text))) {
        const errMsg = errorMessage(welcomeMessage)
        await sendMessage(bot, chatId, errMsg, messageIds);
      }
    } else if (isUserAndValidText(text, awaitingPriceResponse, chatId)) {
      await handlePriceResponse(bot, msg, text, messageIds);
      awaitingPriceResponse.delete(chatId)
    } else {
      const commandInvalid = notCommandMessage(welcomeMessage)
      await sendMessage(bot, chatId, commandInvalid, messageIds);
    }
  } catch (error) {
    console.log('Error al procesar el mensaje:', error);
    await sendMessage(bot, chatId, 'Error al procesar el mensaje', messageIds);
  }
}