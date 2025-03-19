import axios from "axios";
import { enviroment } from "../config/enviroment.js";
import { sendMessage } from "./telegram.js";
import { buildUrl } from "./function.js";

const cryptoIds = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
};

export const getPrice = async (bot, chatId, messageIds, crypto) => { 
  try {
    const cleanCrypto = crypto.replace('/', '').toUpperCase();

    const cryptoId = cryptoIds[cleanCrypto];

    if (!cryptoId) {
      console.error('Cripto inválida ', crypto);
      sendMessage(bot, chatId, 'Cripto inválida ', messageIds);
      return null;
    };

    const url = `${enviroment.URL_BASE}`;
    const path = `${enviroment.URL_BASE_PATH}`;
    const urlComplete = buildUrl(url, path, { fsym: cleanCrypto, tsyms: 'USDT' });

    const response = await axios.get(urlComplete);
    const price = response.data.USDT;
    return price;
  } catch (error) {
    console.error('Error al obtener el precio de Bitcoin', error);
    sendMessage(bot, chatId, 'Error al obtener el precio de Bitcoin', messageIds);
    return null
  }
};
