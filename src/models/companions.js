import json_data from '../temp/messages.json'

class Companion {
    /**
     * 
     * @param {string} nombre Nombre del acompañante
     * @param {string} mensaje Mensaje call del acompañante
     */
    constructor(nombre, mensaje){
        this.nombre = nombre;
        this.mensaje = mensaje;
    }

    mensajito() {
        // Cargar el JSON
        const data = JSON.parse(json_data);

        // Obtener los mensajes
        const mensajes = data["Mensajes"];

        // Obtener una clave aleatoria
        const clavesMensajes = Object.keys(mensajes);
        const clave_aleatoria = clavesMensajes[Math.floor(Math.random() * clavesMensajes.length)];

        // Obtener el mensaje correspondiente a la clave aleatoria
        const mensaje_aleatorio = mensajes[clave_aleatoria];

        // Retornar el mensaje aleatorio
        return mensaje_aleatorio;
    }
}