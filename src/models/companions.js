import data from '../temp/messages.json';

class Companion {
    /**
     * 
     * @param {string} nombre Nombre del acompañante
     * @param {string} id Id del acompañante
     */
    constructor(nombre, id){
        this.nombre = nombre;
        this.id = id;
    }

    mensajito() {
        // Acceder a los mensajes
        const mensajes = data.Mensajes;

        // Obtener una clave aleatoria
        const clavesMensajes = Object.keys(mensajes);
        const clave_aleatoria = clavesMensajes[Math.floor(Math.random() * clavesMensajes.length)];

        // Obtener el mensaje correspondiente a la clave aleatoria
        const mensaje_aleatorio = mensajes[clave_aleatoria];

        // Retornar el mensaje aleatorio
        return mensaje_aleatorio;
        
    }
}

export default Companion;