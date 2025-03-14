const welcomeMessage = `
\¡Bienvenido al Bot de precio de Bitcoin\\!
Aquí tienes los comandos disponibles:

/start \\- Muestra este mensaje de bienvenida
/price \\- Obtiene el precio actual de Bitcoin
/clear \\- Borra los mensajes enviados por el bot
`;

const notCommandMessage = `
        No soy un bot conversacional, pero puedo ayudarte con comandos\\! Prueba uno de los siguientes:\n\n${welcomeMessage.split('\n').slice(2).join('\n').trim()}
`;

const errorMessage = `
    \¡Comando no válido\\!  
    Por favor, usa uno de los siguientes comandos:  

    ${welcomeMessage.split('\n').slice(2).join('\n').trim()}
`;


module.exports = {
  welcomeMessage,
  notCommandMessage,
  errorMessage
}