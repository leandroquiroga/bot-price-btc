import { validCommands } from "../config/configuration.js";
import { errorMessage, notCommandMessage, welcomeMessage } from "../utils/messages.js";
import { sendMessage } from "../utils/telegram.js";

export const eventsMessage = async (bot, msg, messageIds) => {
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
}