import { startCommand } from "./start.js";
import { priceCommand } from './price.js';
import { clearCommand } from './clear.js';
import { alertCommand, checkAlerts } from "./alert.js";


export const commands = {
    start: startCommand,
    price: priceCommand,
    alert: alertCommand,
    clear: clearCommand,
    checkAlerts: checkAlerts
};