import { getPrice } from "../utils/api.js";

export const alertCommand = (bot, msg, match, alerts) => {

  try {
    const chatId = msg.chat.id;
    const targetPrice = parseFloat(match[1]);
    alerts.push({ chatId, targetPrice });
    bot.sendMessage(chatId, `Alerta creada para el precio ${targetPrice}`);
  } catch (error) {
    bot.sendMessage(chatId, 'Error al crear la alerta', error);
  }
}

export const checkAlerts = async (bot, alerts) => {
  try {
    const response = await getPrice();
    const currentPrice = parseFloat(response);
    alerts.forEach((alert, index) => {
      if (currentPrice >= alert.targetPrice) {
        bot.sendMessage(alert.chatId, `Alerta: El precio de Bitcoin ha superado los ${alert.targetPrice}`);
        alerts.splice(index, 1);
      }
    });
  } catch (error) {
    console.log('Error al obtener el precio de Bitcoin:', error);
  }
}