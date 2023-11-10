import React, { useState } from 'react';
import '../styles/stylesPP.css'

const RecruitComponent = ({ onRecruitExp, onRecruitDamage, onRecruitDamageSec, expData}) => {
  const [recruits, setRecruits] = useState(0);
  const [countrecruitDamageSec, setCountRecruitDamageSec] = useState(5); //Daño por segundo base
  const [costDamage, setCostDamage] = useState(2); 
  const [costExp, setCostExp] = useState(2); 
  const [costDps, setCostDps] = useState(2); 
 

  const [mostrarMensajeError, setMostrarMensajeError] = useState(false);

  const handleRecruitDamageClick = () => {

    if (expData< costDamage) {
      setMostrarMensajeError(true);

      setTimeout(() => {
        setMostrarMensajeError(false);
      }, 1000); 


    } else {
      const newExp = (expData - costDamage)
      // Incrementa el costo del recluta
      setCostDamage(costDamage + 2);//Coste Acumulado

      // Incrementa el contador de reclutas
      setRecruits(recruits + 1);

      // Llama a la función de reclutamiento pasada como prop
      if (onRecruitDamage) {
        onRecruitDamage(newExp);
      };
    };
  };

  const handleRecruitExpClick = () => {
    if (expData < costExp) {
      setMostrarMensajeError(true);

      setTimeout(() => {
        setMostrarMensajeError(false);
      }, 1000); // 1000 milisegundos (1 segundos)


    } else {
      const newExp = (expData - costExp)
      // Incrementa el costo del recluta
      setCostExp(costExp + 1);

      // Incrementa el contador de reclutas
      setRecruits(recruits + 1);

      // Llama a la función de reclutamiento pasada como prop
      if (onRecruitExp) {
        onRecruitExp(newExp);
      };
    };
  };

  const handleRecruitDamageSecClick = () => {
    if (expData < costDps) {
      setMostrarMensajeError(true);

      setTimeout(() => {
        setMostrarMensajeError(false);
      }, 1000); 


    } else {
      setCountRecruitDamageSec(countrecruitDamageSec + 3);//DPS por comprar cada aumento

      const newExp = (expData - costDps); 
      // Incrementa el costo del recluta
      setCostDps(costDps + 2);

      // Incrementa el contador de reclutas
      setRecruits(recruits + 1);

      // Llama a la función de reclutamiento pasada como prop
      if (onRecruitDamageSec) {
        onRecruitDamageSec(newExp, countrecruitDamageSec);
      };
    };

  };

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
