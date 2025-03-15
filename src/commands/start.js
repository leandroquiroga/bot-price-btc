import { imagePath } from "../config/configuration.js";
import { welcomeMessage } from "../utils/messages.js";
import { sendPhotoWithFallBack } from "../utils/telegram.js";

export const startCommand = (bot, message, messageIds) => {
  const chatId = message.chat.id;
  sendPhotoWithFallBack(bot, chatId, imagePath, welcomeMessage, messageIds);
}
