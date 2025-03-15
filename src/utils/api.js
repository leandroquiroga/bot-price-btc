import axios from "axios";
import { enviroment } from "../config/enviroment.js";

export const getBitcoinPrice = async () => { 
  try {
    const url = `${enviroment.URL_BASE}${enviroment.URL_BASE_PATH}`;
    const response = await axios.get(url);
    const price = response.data.USDT;
    return price;
  } catch (error) {
    console.error('Error al obtener el precio de Bitcoin:', error);
    return null
  }
};
