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
import '../styles/stylesPP.css'


const Layout = ({ children }) => {

  const enemyImages =[
    require('../imagenes/enemy/BUHO.png'),
    require('../imagenes/enemy/HONGO.png'),
    require('../imagenes/enemy/MURCIELAGO.png'),
    require('../imagenes/enemy/PÉSCADO.png'),
    require('../imagenes/enemy/SOMBRERIN.png'),
  ];

  const [enemyImage, setEnemyImage] = useState(null);

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
    const randomImages = enemyImages[Math.floor(Math.random() * enemyImages.length)];

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

    setEnemyImage(randomImages)
    //   // Cambiar el color de fondo aleatoriamente
    // let enemy = document.querySelector(".enemy");
    // enemy.style.backgroundColor = RANDOMCOLOR();
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
      <div className='estadisticas'>
        
        <div >
          <header>
            <h1>Kokoro Healing</h1>
            <div id="reloj"></div>
          </header>
            <Message />
            <p>Bienvenido a nuestro juego clicker.</p>
            
            <div id="reloj"></div>
            <span id="enemyHealth" className='spanenemy'> vida del enemigo: {enemyInstance.vida}</span>
            
            <div className="scoreboard">
              <span id="score"> Experiencia emocional : {expData}</span>
              {children}
            </div>
            

            <RecruitComponent onRecruitExp={onRecruitExp} onRecruitDamage={onRecruitDamage} onRecruitDamageSec={onRecruitDamageSec} expData={expData}/>

            <SessionTime />  {/* tiempo */}
          
            {children}
        </div>

      </div>
      <div className="game-container">
         {/* Contenedor TABLERO */}
        <div className='enemycontainer'>
          {/* <div className="vidaenemigo">
            <span id="enemyHealth" className='spanenemy'> vida: {enemyInstance.vida}</span>
          </div> */}
          <div>
            <button className='enemychange' onClick={attack} ><img className='imageenemy' src={enemyImage} alt="Enemigo" /></button>
          </div>
        </div>

        <div className='guardarjson'>
        <SaveComponent UserData={UserData} CharacterData={characterInstance} EnemyData={enemyInstance} expData={expData}></SaveComponent>
        </div>
      </div> 
    </div>
    

  );
};

export default Layout;

