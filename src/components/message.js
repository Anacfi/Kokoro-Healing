import { useEffect, useState } from 'react';
import Companion from '../models/companions';
import UserData from '../sessions/data.json'; // JSON del Character

const Message = () => {

  const [companionInstace, setCompanionInstance] = useState(
    new Companion(
      UserData.Companion.Nombre,
      UserData.Companion.id,
    )
  ); // Crear una instancia de la clase Enemigo

  useEffect(() => {
    // Función que se ejecuta después de un tiempo aleatorio
    function executeAfterRandomTime() {
      // Genera un número aleatorio entre 1 y 10 para el tiempo de espera en segundos
      const randomSeconds = Math.floor(Math.random() * 10) + 1;
  
  
      setTimeout(() => {
        const message = companionInstace.mensajito();
        document.getElementById('pet-message').textContent = message;
      }, randomSeconds * 1000); // Multiplica por 1000 para obtener milisegundos
    }
  
    // Establece un intervalo para que la función se vuelva a ejecutar después de un tiempo aleatorio cada vez
    const intervalId = setInterval(executeAfterRandomTime, 10000); // Ejecuta cada 10 segundos (ajusta el tiempo según tus necesidades)
  
    // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);
  

  return (
  <div id="pet" className='pet'>🐱
    <p id='pet-message'>
    
    </p>
  </div>
);
}

export default Message;