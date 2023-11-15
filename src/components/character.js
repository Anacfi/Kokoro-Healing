// CharacterComponent.js

import React, { useState } from 'react';
import Message from './message';
import aliado1 from '../imagenes/aliados/aliado.png';
import '../styles/stylesPP.css'; // Asegúrate de importar el archivo CSS aquí

const CharacterComponent = ({ cardSeleccionada, onImageSelected }) => {
  const [showMessages, setShowMessages] = useState(true);

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  const handleImageClick = () => {
    if (cardSeleccionada && onImageSelected) {
      console.log('Valor de imagenSeleccionada:', cardSeleccionada.image);
      onImageSelected(cardSeleccionada.image);
      console.log('handleImageSelected se ha llamado con éxito');
    }
  };

  console.log('Valor de imagenSeleccionada:', cardSeleccionada);
  return (
    <>
      <div className="character" onClick={toggleMessages}>
        <img className='imagenaliado' src={aliado1} alt="Aliado 1" onClick={handleImageClick} />
        {cardSeleccionada && (
          <img
            style={{ maxWidth: '200px', maxHeight: '200px' }} // Estilos básicos para verificar la visualización
            src={cardSeleccionada}
            alt="Imagen Seleccionada"
          />
        )}
        {cardSeleccionada && (
          <img className='imagenSeleccionada' src={cardSeleccionada} alt="Imagen Seleccionada" />
        )}
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