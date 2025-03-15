import { startCommand } from "./start.js";
import { priceCommand } from './price.js';
import { clearCommand } from './clear.js';


export const commands = {
    start: startCommand,
    price: priceCommand,
    clear: clearCommand,
};