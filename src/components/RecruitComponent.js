import React, { useState } from 'react';
import '../styles/stylesPP.css'

const RecruitComponent = ({ onRecruitExp, onRecruitDamage, onRecruitDamageSec, expData}) => {
  const [recruits, setRecruits] = useState(0);
  const [countrecruitDamageSec, setCountRecruitDamageSec] = useState(1);
  const [cost, setCost] = useState(2);
  const [mostrarMensajeError, setMostrarMensajeError] = useState(false);

  const handleRecruitDamageClick = () => {

    if (expData< cost) {
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
      if (onRecruitDamage) {
        onRecruitDamage(newExp);
      };
    };
  };

  const handleRecruitExpClick = () => {
    if (expData < cost) {
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
      if (onRecruitExp) {
        onRecruitExp(newExp);
      };
    };
  };

  const handleRecruitDamageSecClick = () => {
    if (expData < cost) {
      setMostrarMensajeError(true);

      setTimeout(() => {
        setMostrarMensajeError(false);
      }, 1000); 


    } else {
      setCountRecruitDamageSec(countrecruitDamageSec + 1);

      const newExp = expCost(); 
      // Incrementa el costo del recluta
      setCost(cost + 2);

      // Incrementa el contador de reclutas
      setRecruits(recruits + 1);

      // Llama a la función de reclutamiento pasada como prop
      if (onRecruitDamageSec) {
        onRecruitDamageSec(newExp, countrecruitDamageSec);
      };
    };

  };

  const expCost = () => {
    const newExp = (expData - cost)
    return newExp;
  } 

  return (
    <div className='recruit'>
      <button className='attack-button' onClick={handleRecruitDamageClick}>mejorar Impacto por click</button>
      <button className='attack-button' onClick={handleRecruitExpClick}>mejorar experiencia </button>
      <button className='attack-button' onClick={handleRecruitDamageSecClick}>Impacto por click/sec</button>

      {mostrarMensajeError && <p id='mensajeError'>No tienes suficiente experiencia aún.</p>}
      <p>Reclutas: {recruits}</p>
    </div>
  );
};

export default RecruitComponent;
