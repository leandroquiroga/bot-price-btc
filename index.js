
const fs = require('fs');
const dotenv = require('dotenv')
dotenv.config();  
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const cron = require('node-cron');

const token_telegram = process.env.API_KEY_BOT_TELEGRAM;
const bot_telegram = new TelegramBot(token_telegram, { polling: true });

// const validCommands = ['start', 'clear', 'price'];
// const image = './public/image/image_btc.jpg';

let messageIds = [];
// Mensaje de bienvenida con comandos
const welcomeMessage = `
\¡Bienvenido al Bot de precio de Bitcoin\\!
Aquí tienes los comandos disponibles:

/start \\- Muestra este mensaje de bienvenida
/price \\- Obtiene el precio actual de Bitcoin
/clear \\- Borra los mensajes enviados por el bot
`;
// const welcomeMessage = '\¡Bienvenido\\! Este es tu bot de precios de BTC\\.';
bot_telegram.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Verificar si el archivo existe
  if (fs.existsSync(image)) {
    try {
      // Crear el stream de la imagen
      const imageStream = fs.createReadStream(image);

      // Enviar la imagen con el caption
      bot_telegram.sendPhoto(chatId, imageStream, {
        caption: welcomeMessage, // Usar el mensaje escapado
        parse_mode: 'MarkdownV2' // Especificar MarkdownV2
      })
        .then((sentMsg) => {
          console.log('Imagen enviada con éxito');
          messageIds.push(sentMsg.message_id); // Guardar el ID del mensaje
        })
        .catch((err) => {
          // console.error('Error al enviar la imagen:', err);
          // Si falla la imagen, enviar solo el mensaje de texto
          bot_telegram.sendMessage(chatId, welcomeMessage, { parse_mode: 'MarkdownV2' })
            .then((sentMsg) => {
              console.log('Mensaje de texto enviado como fallback');
              messageIds.push(sentMsg.message_id);
            });
        });
    } catch (error) {
      // Enviar solo el mensaje como fallback
      bot_telegram.sendMessage(chatId, welcomeMessage, { parse_mode: 'MarkdownV2' })
        .then((sentMsg) => {
          messageIds.push(sentMsg.message_id);
        })
    }
  } else {
    // Si no existe la imagen, enviar solo el mensaje
    bot_telegram.sendMessage(chatId, welcomeMessage, { parse_mode: 'MarkdownV2' })
      .then((sentMsg) => {
        messageIds.push(sentMsg.message_id);
      })
  }
});

async function getBitcoinPrice() {
  try {
    const url = process.env.API_BASE;
    const urlPath = process.env.API_BASE_PATH;
    const urlBase = `${url}${urlPath}`;
    const response = await axios.get(urlBase);
    const price = response.data.USDT;
    return price;
  } catch (error) {
    console.error('Error al obtener el precio:', error);
    return null;
  }
}

bot_telegram.onText(/\/clear/, (msg) => {
  const chatId = msg.chat.id;

  if (messageIds.length === 0) {
    bot_telegram.sendMessage(chatId, 'No hay mensajes para limpiar.');
    return;
  }

  // Borrar cada mensaje almacenado
  messageIds.forEach((messageId) => {
    bot_telegram.deleteMessage(chatId, messageId)
      .then(() => {
        console.log(`Mensaje ${messageId} borrado`);
      })
      .catch((err) => {
        console.error(`Error al borrar mensaje ${messageId}:`, err);
      });
  });
});

bot_telegram.onText(/\/price/, async (msg) => {
  const chatId = msg.chat.id;
  const price = await getBitcoinPrice();
  if (price) {
    bot_telegram.sendMessage(chatId, `El precio actual de Bitcoin es: $${price} USD`);
  } else {
    bot_telegram.sendMessage(chatId, 'Error al obtener el precio.');
  }
});

// Manejar todos los mensajes
bot_telegram.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text; // Texto del mensaje (si existe)

  // Solo procesar mensajes de texto
  if (text) {
    // Si el mensaje es un comando (comienza con /)
    if (text.startsWith('/')) {
      const command = text.slice(1).split(' ')[0].split('@')[0].toLowerCase();

      // Si el comando no es válido, enviar el mensaje de error
      if (!validCommands.includes(command)) {
        const errorMessage = `
            \¡Comando no válido\\!  
            Por favor, usa uno de los siguientes comandos:  

            ${welcomeMessage.split('\n').slice(2).join('\n').trim()}
        `;

        bot_telegram.sendMessage(chatId, errorMessage, { parse_mode: 'MarkdownV2' })
          .then((sentMsg) => {
            messageIds.push(sentMsg.message_id);
          })
          .catch((err) => {
            console.error('Error al enviar mensaje de error:', err);
          });
      }
    } else {
      // Opcional: Responder a mensajes que no son comandos (como "hola")
      const notCommandMessage = `
          No soy un bot conversacional, pero puedo ayudarte con comandos\\! Prueba uno de los siguientes:\n\n${welcomeMessage.split('\n').slice(2).join('\n').trim()}
      `;

      bot_telegram.sendMessage(chatId, notCommandMessage, { parse_mode: 'MarkdownV2' })
        .then((sentMsg) => {
          messageIds.push(sentMsg.message_id);
        })
        .catch((err) => {
          console.error('Error al enviar mensaje de texto no comando:', err);
        });
    }
  }
});

console.log('Bot corriendo...');