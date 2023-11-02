import React, { useState, useRef } from 'react';
import backgroundMusicSrc from '../audio/BackgroundMusic.mp3';

const Audiogame = () => {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const playMusic = () => {
    try {
      if (audioRef.current.paused) {
        audioRef.current.currentTime = 0; // Restablece la posición de reproducción al principio
      }
      audioRef.current.play();
      setMusicPlaying(true);
    } catch (error) {
      console.error('Error al reproducir música de fondo: ', error);
    }
  };

  const pauseMusic = () => {
    try {
      audioRef.current.pause();
      setMusicPlaying(false);
    } catch (error) {
      console.error('Error al detener la música de fondo: ', error);
    }
  };

  return (
    <div className="audio-control-container">
      <audio ref={audioRef} src={backgroundMusicSrc} loop />
      {musicPlaying ? (
        <button className="audio-control-button" onClick={pauseMusic}>
          Pausar Música
        </button>
      ) : (
        <button className="audio-control-button" onClick={playMusic}>
          Reproducir Música
        </button>
      )}
    </div>
  );
};

export default Audiogame;
