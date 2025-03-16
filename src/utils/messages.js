export const welcomeMessage = `
\¡Bienvenido al Bot de precio de Bitcoin\\!
Aquí tienes los comandos disponibles:

/start \\- Muestra este mensaje de bienvenida
/price \\- Obtiene el precio actual de Bitcoin
/alert \\- Obtiene una alerta de precio de Bitcoin
/clear \\- Borra los mensajes enviados por el bot
`;

export const notCommandMessage = (welcomeMessageBody) => `
No soy un bot conversacional, pero puedo ayudarte con comandos\\! Prueba uno de los siguientes:\n\n${welcomeMessageBody.split('\n').slice(2).join('\n').trim()}
`;

export const errorMessage = (welcomeMessageBody) => `
¡Comando no válido\\!  
Por favor, usa uno de los siguientes comandos:  

${welcomeMessageBody.split('\n').slice(2).join('\n').trim()}
`;
