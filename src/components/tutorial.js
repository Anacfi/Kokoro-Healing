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
      setInstruction('Bienvenido a Kokoro Healing, este es nuestro tutorial');
    }

    if (nTuto === 2) {
      setInstruction('Al comenzar, veras un objetivo o desafio simple para superar, al hacer click lo superaras y respawneara uno nuevo');
    }

    if (nTuto === 3) {
      setInstruction('Al superar un desafio, te daran experiencia emocional y esta te servira para mejorar habilidades que te ayudaran a superar desafios de manera mas simple');
    }

    if (nTuto === 4) {
      setInstruction('En el borde se encuentra un boton para guardar partida , se descargara un archivo , guardalo muy bien para continuar con tu aventura');
    }

    if (nTuto === 5) {
      setInstruction('Abajo de guardar partida se encuentra un boton que activa la musica, presionalo y disfruta de Kokoro Healing');
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