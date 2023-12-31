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
      //console.log('Valor de imagenSeleccionada:', cardSeleccionada.image);
      onImageSelected(cardSeleccionada.image);
      console.log('handleImageSelected se ha llamado con éxito');
    }
  };


  // Obtener el valor de "cardSeleccionada" desde el localStorage
  const cardSeleccionadaString = localStorage.getItem("cardSeleccionada");

  // Convertir el string obtenido en un objeto JavaScript
  const cardSeleccionadaObjeto = JSON.parse(cardSeleccionadaString);

  // Acceder a la propiedad "image" del objeto
  const imagen = cardSeleccionadaObjeto.image;

  console.log(imagen);
  return (
    <>
      <div className="character" onClick={toggleMessages}>
        <img className='imagenaliado' src={aliado1} alt="Aliado 1" onClick={handleImageClick} />
        <div className='imagenheadaliado'>
          <img
              style={{ maxWidth: '500px', maxHeight: '500px', borderRadius:'100px'}} // Estilos básicos para verificar la visualización
              src={imagen}
              alt="Imagen Seleccionada"
            />
        </div>
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