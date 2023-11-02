import React, { useEffect } from 'react';

const Audiogame = () => {
  useEffect(() => {
    const backgroundMusic = new Audio('../audio/BackgroundMusic.mp3');
    backgroundMusic.loop = true;

    const playMusic = () => {
      try {
        backgroundMusic.play();
      } catch (error) {
        // Controla los errores en caso de que la reproducción falle
        console.error('Error al reproducir música de fondo: ', error);
      }
    };

    playMusic();

    // Maneja la pausa cuando el componente se desmonta
    return () => {
      try {
        backgroundMusic.pause();
      } catch (error) {
        // Controla los errores en caso de que la pausa falle
        console.error('Error al detener la música de fondo: ', error);
      }
    };
  }, []);

  return null; // No necesitas un elemento JSX visible, por lo que puedes devolver null
};

export { Audiogame };

