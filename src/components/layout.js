// Layout.js
import UserData from '../sessions/data.json'; // JSON del Character
import Character from '../models/character';
import Enemy from '../models/enemy';
import React, { useState, useEffect } from 'react';



const Layout = ({ children }) => {


  const [characterInstance, setCharacterInstance] = useState(
    new Character(  
      UserData.Character.Nombre, 
      UserData.Character.Fuerza
      )
  );// Crear una instancia de la clase Character
  
  const [enemyInstance, setEnemyInstance] = useState(
    new Enemy(
      UserData.Enemy.Nombre, 
      UserData.Enemy.Vida,
      UserData.Enemy.Defensa,
      UserData.Enemy.exp
    )
  ); // Vida inicial del Enemigo

  const [coinsData, setCoinsData] = useState(1); // Puntaje actual
  


  useEffect(() => {

  }, []); // El arreglo vacío [] asegura que este efecto se ejecute solo una vez al montar el componente



  //FUNCION PARA ATACARz
  const attack = () => {

      setEnemyInstance(new Enemy(
          enemyInstance.nombre,
          characterInstance.attack(enemyInstance),
          enemyInstance.defensa,
          enemyInstance.exp
        )
      );
      
      

    console.log(enemyInstance);
    // Actualizar el estado de enemyInstance con la nueva instancia
  


    // Comprobar si el enemigo ha sido derrotado
    if (enemyInstance.vida <= 0 || isNaN(enemyInstance.vida)) {
      console.log("Estoy muerto")
      score();
      spawnNewEnemy();
    }
  };


  
  // const increasePlayerDamage = () => {
  //   setPlayerDamage(playerDamage + 1); // Aumenta el daño del personaje
  // };


  // FUNCION PARA EL SPAWNENEMY
  const spawnNewEnemy = () => {
    // Reiniciar la vida del enemigo y actualizar el estado
    setEnemyInstance.vida = 10 * coinsData;
    console.log(enemyInstance.vida);

      // Cambiar el color de fondo aleatoriamente
    let enemy = document.querySelector(".enemy");
    enemy.style.backgroundColor = getRandomColor();
  };  


  // FUNCION PARA EL PUNTAJE
  const score = () => {
    // Sumamos el puntaje
    setCoinsData(coinsData + 1);
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
    <div className='container'>
      <header>
        <h1>Clicker Game</h1>
      </header>
        <p>Bienvenido a nuestro juego clicker.</p>
        <div className="game-container"> {/* Contenedor TABLERO */}
          <div className="enemy"><span id="enemyHealth">{enemyInstance.vida}</span></div>
          <div className="character"></div>
          <button className="attack-button" onClick={attack} >Attack</button>
          {/*<button className="increase-damage-button" onClick={increasePlayerDamage}>Increase Damage</button>*/}
        </div>
        
        <div className="scoreboard">
          <span id="score"> score: {coinsData}</span>
        </div>
        {/*<div className='scoredamage'>
          <span id='damage'>Daño personaje: {playerDamage}</span> 
        </div>*/}
        {children}

      <footer>
        <p>© 2023 Clicker Game project</p>
      </footer>
    </div>

  );
};

export default Layout;

