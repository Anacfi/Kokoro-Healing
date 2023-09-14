import React, { useState } from 'react';

const RecruitButton = ({ onRecruit, characterexp}) => {
  const [recruits, setRecruits] = useState(0);
  const [cost, setCost] = useState(2);
  const [mostrarMensajeError, setMostrarMensajeError] = useState(false);

  const handleRecruitDamageClick = () => {
    if (characterexp < cost) {
      setMostrarMensajeError(true);

      setTimeout(() => {
        setMostrarMensajeError(false);
      }, 1000); 


    } else {
      const newExp = expCost(); 
      // Incrementa el costo del recluta
      setCost(cost + 2);

      // Incrementa el contador de reclutas
      setRecruits(recruits + 1);

      // Llama a la función de reclutamiento pasada como prop
      if (onRecruit) {
        onRecruit(newExp);
      };
    };
  };

  const handleRecruitExpClick = () => {
    if (characterexp < cost) {
      setMostrarMensajeError(true);

      setTimeout(() => {
        setMostrarMensajeError(false);
      }, 1000); // 1000 milisegundos (1 segundos)


    } else {
      const newExp = expCost(); 
      // Incrementa el costo del recluta
      setCost(cost + 2);

      // Incrementa el contador de reclutas
      setRecruits(recruits + 1);

      // Llama a la función de reclutamiento pasada como prop
      if (onRecruit) {
        onRecruit(newExp);
      };
    };
  };

  const handleRecruitDamageSecClick = () => {
    if (characterexp < cost) {
      setMostrarMensajeError(true);

      setTimeout(() => {
        setMostrarMensajeError(false);
      }, 1000); 


    } else {
      const newExp = expCost(); 
      // Incrementa el costo del recluta
      setCost(cost + 2);

      // Incrementa el contador de reclutas
      setRecruits(recruits + 1);

      // Llama a la función de reclutamiento pasada como prop
      if (onRecruit) {
        onRecruit(newExp);
      };
    };

  };

  const expCost = () => {
    const newExp = (characterexp - cost)

    console.log(newExp);
    return newExp;
  }

  return (
    <div>
      <button className='attack-button' onClick={handleRecruitDamageClick}>Reclutar Daño</button>
      <button className='attack-button' onClick={handleRecruitExpClick}>Reclutar Exp</button>
      <button className='attack-button' onClick={handleRecruitDamageSecClick}>Reclutar Daño/sec</button>

      {mostrarMensajeError && <p id='mensajeError'>No tienes suficiente experiencia aún.</p>}
      <p>Reclutas: {recruits}</p>
    </div>
  );
};

export default RecruitButton;
