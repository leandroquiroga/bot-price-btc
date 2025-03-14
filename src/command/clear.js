import { deleteMessages, sendMessage } from '../utils/telegram'

export const clearCommand = async (btoa, message, messageIds) => { 
  const chatId = message.chat.id;

  if (messageIds.length === 0) {
    sendMessage(btoa, chatId, 'No hay mensajes para limpiar.', messageIds);
    return;
  };

  await deleteMessages(btoa, chatId, messageIds);
  messageIds.length = 0;
};
