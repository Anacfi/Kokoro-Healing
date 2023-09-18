// Layout.js
import UserData from '../sessions/data.json'; // JSON del Character
import Character from '../models/character';
import Enemy from '../models/enemy';
import React, { useState } from 'react';
import Message from './message';
import SessionTime from './sessionTime';
import RANDOMCOLOR from './randomColor';
import RecruitComponent from './RecruitComponent.js';
import SaveComponent from './saveSessionComponent';


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
  ); // Crear una instancia de la clase Enemigo
  
  const [expData, setExpData] = useState(UserData.Exp);       // Experiencia
  const [tempCount, setTempCount] = useState(2);       // Experiencia
  

  // ------------------------------------------------------------------------------ //

  //FUNCION PARA ATACARz
  const attack = () => {
    

    const newVida = characterInstance.attack(enemyInstance, characterInstance);

    setEnemyInstance(prevEnemyInstance => {

      const updatedEnemyInstance = new Enemy(

        prevEnemyInstance.nombre,
        newVida,
        prevEnemyInstance.defensa,
        prevEnemyInstance.exp
      );

      return updatedEnemyInstance;
    });
  
    // Comprobar si el enemigo ha sido derrotado
    if (newVida <= 0 || isNaN(newVida)) {
        score();
        spawnNewEnemy();
    }
  };

  // ------------------------------------------------------------------------------ //

  // FUNCION PARA EL SPAWNENEMY
  const spawnNewEnemy = () => {

    // Reiniciar la vida del enemigo y actualizar el estado
    setEnemyInstance(prevEnemyInstance => {

      const updatedEnemyInstance = new Enemy(

        prevEnemyInstance.nombre,
        10 * tempCount,  // Vida
        prevEnemyInstance.defensa,
        prevEnemyInstance.exp
      );
      
      return updatedEnemyInstance;

    });


      // Cambiar el color de fondo aleatoriamente
    let enemy = document.querySelector(".enemy");
    enemy.style.backgroundColor = RANDOMCOLOR();
  };  

  // ------------------------------------------------------------------------------ //

  
  // HELPER DE DAMAGE
  const onRecruitDamage = (newExp) => {
    const newAttack = characterInstance.incrementAttack(characterInstance);

    setExpData(newExp);

    const updatedCharacterInstance = new Character(
        UserData.Character.Nombre, 
        newAttack
      );

    setCharacterInstance(updatedCharacterInstance);

  };

    // HELPER DE DAMAGE EXP
    const onRecruitExp = (newExp) => {
      const neweEnemyExp = enemyInstance.incrementExp(enemyInstance);
  
      setExpData(newExp);
      console.log("newexp:"+newExp);
  
      const updatedEnemyInstance= new Enemy(
          UserData.Enemy.Nombre,
          enemyInstance.vida,
          enemyInstance.defensa,
          neweEnemyExp
        );
  
      setEnemyInstance(updatedEnemyInstance);
  
    };

    // HELPER DE DAMAGE SEC
    const onRecruitDamageSec = (newExp) => {
      const newAttack = characterInstance.incrementAttack(characterInstance);
  
      setExpData(newExp);
      console.log("newexp:"+newExp);
  
      const updatedCharacterInstance = new Character(
          UserData.Character.Nombre, 
          newAttack
        );
  
      setCharacterInstance(updatedCharacterInstance);
  
    };


  // ------------------------------------------------------------------------------ //


  // FUNCION PARA EL PUNTAJE
  const score = () => {
    // Sumamos el puntaje
    setExpData(expData+enemyInstance.exp);
    setTempCount(tempCount + 1);
  }

  return (
    <div className='container'>
      <header>
        <h1>Clicker Game</h1>
      </header>

      <SaveComponent UserData={UserData} CharacterData={characterInstance} EnemyData={enemyInstance} expData={expData}></SaveComponent>

      <Message>

      </Message>
        <p>Bienvenido a nuestro juego clicker.</p>
        <div className="game-container"> {/* Contenedor TABLERO */}
          
          <div className="enemy"><button onClick={attack} ><span id="enemyHealth">{enemyInstance.vida}</span></button></div>

        </div>

        <div id="reloj"></div>
        
        <div className="scoreboard">
          <span id="score"> Experiencia emocional : {expData}</span>
        </div>

        <RecruitComponent onRecruitExp={onRecruitExp} onRecruitDamage={onRecruitDamage} onRecruitDamageSec={onRecruitDamageSec} expData={expData}/>

        <SessionTime>
        </SessionTime>
        {children}

      <footer>
        <p>© 2023 Clicker Game project</p>
      </footer>
    </div>

  );
};

export default Layout;

