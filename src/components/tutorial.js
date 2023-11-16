import React, { useState, useEffect } from 'react';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLARY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

function Tutorial({ children, flag , onClose}) {

  const [tutoFlag, setTutoFlag] = useState(1); // Num Instrucction Tutorial
  const [nTuto, setNtuto] = useState(1); // Num Instrucction Tutorial
  const [instruction, setInstruction] = useState(''); // Instruccion tutorial

  useEffect(() => {
    if (nTuto === 0) {
      setNtuto(1);
    }   

    if (nTuto === 1) {
      setInstruction('Hola esta es la instruccion 1');
    }

    if (nTuto === 2) {
      setInstruction('Hola esta es la instruccion 2');
    }

    if (nTuto === 3) {
      setInstruction('Hola esta es la instruccion 3');
    }

    if (nTuto === 4) {
      setInstruction('Hola esta es la instruccion 4');
    }

    if (nTuto === 5) {
      setInstruction('Hola esta es la instruccion 5');
    }
    // Esta función se ejecutará cada vez que nTuto cambie

  }, [nTuto]); // La dependencia es nTuto

  const checkNTuto = (nTuto) => { 
    console.log('function');

    
  }

  // Lógica para aplicar cambios basados en la flag
  if (flag) {
    // Realiza las modificaciones deseadas en el DOM
    return(
      <>
        <div style={OVERLARY_STYLES}>
          <div style={MODAL_STYLES}>
            {children}
            <button onClick={onClose}>Cerrar</button>
            <div>
              <p>{instruction}</p>
            </div>
            <button onClick={() => {setNtuto(nTuto-1); checkNTuto(nTuto);}} disabled={nTuto === 1}>Anterior</button>
            <button onClick={() => {setNtuto(nTuto+1); checkNTuto(nTuto);}} disabled={nTuto === 5}> Siguiente</button>
          </div>  
        </div>
      </>
    )
  }

};

export default Tutorial;