import fs from 'fs';

export const sendPhotoWithFallBack = async (bot, chatId, imagePath, caption, messageIds) => {

  // Validamos que la imagen exista en el sistema
  if (fs.statSync(image)) {
    try {
      // Creamos el stream de la imagen
      const imageStream = fs.createReadStream(imagePath);
      const sentMessage = await bot.sendPhoto(chatId, imageStream, {
        caption,
        parse_mode: 'MarkdownV2'
      });

      messageIds.push(sentMessage.message_id);
    } catch (error) {
      const setMessage = await bot.sendMessage(chatId, caption, { parse_mode: 'MarkdownV2' });
      messageIds.push(setMessage.message_id);
    };
  } else {
    const setMessage = await bot.sendMessage(chatId, caption, { parse_mode: 'MarkdownV2' });
    messageIds.push(setMessage.message_id);
  };
};


export const sendMessage = async () => { 
  const sentMessage = await bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'MarkdownV2' });
  messageIds.push(sentMessage.message_id);
};

export const deleteMessages = async () => { 
  for (const messageId of messageIds) {
    try {
      await bot.deleteMessage(chatId, messageId);
    } catch (error) {
      console.error('Error al eliminar el mensaje:', error);
    };
  };
};