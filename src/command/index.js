import { startCommand } from '../command/start';
import { priceCommand } from '../command/price';
import { clearCommand } from '../command/clear';

export const commands = {
    start: startCommand,
    price: priceCommand,
    clear: clearCommand,
};