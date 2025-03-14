import { imagePath } from "../config/config";
import { sendMessage, sendPhotoWithFallBack } from "../utils/telegram";

export const startCommand = (bot, message, messageIds) => {
  const chatId = message.chat.id;
  sendPhotoWithFallBack(bot, chatId, imagePath, sendMessage, messageIds);
}
