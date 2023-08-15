// Layout.js
import jsonData from '../sessions/data.json'; // JSON de la sesion actual

import React, { useState, useEffect } from 'react';

const Layout = ({ children }) => {

  const [enemyHealth, setEnemyHealth] = useState(0); // Vida inicial del Enemigo
  const [scoreData, setScoreData] = useState(0); // Puntaje actual

  useEffect(() => {
    // Cargar valores iniciales desde el archivo JSON
    setEnemyHealth(jsonData["enemy-health"]);
    setScoreData(jsonData["score"]);
  }, []); // El arreglo vacío [] asegura que este efecto se ejecute solo una vez al montar el componente


  const attack = () => {
    // Restar 1 a la vida del enemigo
    const newHealth = enemyHealth - 1;

    // Actualizar el estado de enemyHealth
    setEnemyHealth(newHealth);

    // Comprobar si el enemigo ha sido derrotado
    if (newHealth <= 0) {
      score();
      spawnNewEnemy();
    }
  };

  const spawnNewEnemy = () => {
    // Reiniciar la vida del enemigo y actualizar el estado
    setEnemyHealth(10 * scoreData);

      // Cambiar el color de fondo aleatoriamente
    let enemy = document.querySelector(".enemy");
    enemy.style.backgroundColor = getRandomColor();
  };

  const score = () => {
    // Sumamos el puntaje
    setScoreData(scoreData + 1);
  }

  // FUNCION PARA RANDOMCOLOR
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

  return (
    <div>
      <header>
        <h1>Clicker Game</h1>
      </header>
      <main>
        <p>Bienvenido a nuestro juego clicker.</p>
        <div className="game-container"> {/* Contenedor TABLERO */}
          <div className="character"></div>
          <div className="enemy"><span id="enemyHealth">{enemyHealth}</span></div>
          <button className="attack-button" onClick={attack} >Attack</button>
        </div>
        <div className="scoreboard">
          <span id="score">{scoreData}</span>
        </div>  
        {children}
      </main>
      <footer>
        <p>© 2023 Clicker Game project</p>
      </footer>
    </div>
  );
};

export default Layout;
