import React, { useState } from 'react';
import DataSession from '../sessions/data.json'; // JSON del Character
import '../styles/stylesPP.css';

const SaveComponent = ({ UserData, EnemyData, CharacterData, expData }) => {
  const [recruits, setRecruits] = useState(0);
  const [cost, setCost] = useState(2);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleSaveSession = () => { 

    // Clonar el objeto DataSession
    const newDataSession = { ...DataSession };

    // Realizar las ediciones necesarias en newDataSession
    newDataSession.Exp = expData; 
    newDataSession.Enemy.Vida = EnemyData.vida;
    newDataSession.Enemy.exp = EnemyData.exp; 

    // Convertir el objeto clonado a JSON
    const jsonData = JSON.stringify(newDataSession, null, 2);

    // Crear un Blob con el JSON y un enlace para descargarlo
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace para descargar el archivo JSON
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dataSession.json';

    // Simular un clic en el enlace para descargar el archivo
    a.click();

    // Limpiar el objeto URL creado
    URL.revokeObjectURL(url);

    // Mostrar un mensaje de éxito (opcional)
    setMostrarMensaje(false);
  };


  return (
    <div className='guardarbuttondiv'>
      <button className="guardarbutton" onClick={handleSaveSession}></button>
      {mostrarMensaje && <p id='saveMessage'>Sesion guardada</p>}

    </div>
  );
};

export default SaveComponent;
