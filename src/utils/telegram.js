import fs from 'fs';

export const sendPhotoWithFallBack = async (bot, chatId, imagePath, caption, messageIds) => {
  // Validar que caption no esté vacío
  if (!caption || caption.trim() === '') {
    console.error('Error: El caption está vacío o no es válido');
    return;
  }

  // Validamos que la imagen exista en el sistema
  if (fs.existsSync(imagePath)) {
    try {
      const imageStream = fs.createReadStream(imagePath);
      const sentMessage = await bot.sendPhoto(chatId, imageStream, {
        caption,
        parse_mode: 'MarkdownV2',
      });
      messageIds.push(sentMessage.message_id);
      console.log('Foto enviada con éxito');
    } catch (error) {
      console.error('Error al enviar la foto:', error);
      const sentMessage = await bot.sendMessage(chatId, caption, { parse_mode: 'MarkdownV2' });
      messageIds.push(sentMessage.message_id);
      console.log('Mensaje de texto enviado como fallback');
    }
  } else {
    const sentMessage = await bot.sendMessage(chatId, caption, { parse_mode: 'MarkdownV2' });
    messageIds.push(sentMessage.message_id);
    console.log('Mensaje enviado (sin imagen disponible)');
  }
};

export const sendMessage = async (bot, chatId, message, messageIds) => {
  // Validar que el mensaje no esté vacío
  if (!message || message.trim() === '') {
    console.error('Error: El mensaje está vacío o no es válido');
    return;
  }

  const sentMessage = await bot.sendMessage(chatId, message, { parse_mode: 'MarkdownV2' });
  messageIds.push(sentMessage.message_id);
  console.log('Mensaje enviado:', message);
};

export const deleteMessages = async (bot, chatId, messageIds) => {
  for (const messageId of messageIds) {
    try {
      await bot.deleteMessage(chatId, messageId);
      console.log(`Mensaje ${messageId} eliminado`);
    } catch (error) {
      console.error('Error al eliminar el mensaje:', error);
    }
  }
  messageIds.length = 0; // Limpiar el array después de eliminar
};