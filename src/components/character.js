import React, { useState } from 'react';
import Message from './message';
import aliado1 from '../imagenes/aliados/aliado.png';

const CharacterComponent = () => {
  const [showMessages, setShowMessages] = useState(true);

  // Función para mostrar los mensajes
  const toggleMessages = () => {
    setShowMessages(!showMessages); // Cambia el valor actual al contrario
  };

  
  return (
    <>
      <div className="character" onClick={toggleMessages}>
        {/* Mostrar la imagen de tu aliado */}
        <img className='imagenaliado' src={aliado1} alt="Aliado 1" />
      </div>
      {showMessages && (
        <div className="messages">
          {/* Aquí debes colocar tus mensajes o el componente Message */}
          <Message />
        </div>
      )}
    </>
  );
};

export default CharacterComponent;