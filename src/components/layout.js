// Layout.js
import UserData from '../sessions/data.json'; // JSON del Character
import Character from '../models/character';
import Enemy from '../models/enemy';
import React, { useEffect, useState } from 'react';
import SessionTime from './sessionTime';
import RecruitComponent from './RecruitComponent.js';
import SaveComponent from './saveSessionComponent';
import '../styles/stylesPP.css'
import logo from '../imagenes/logo.png'; 
import CharacterComponent from './character';
import Audiogame from './audio.js';
import Stage1 from '../imagenes/mapleforest02.gif';
import Stage2 from '../imagenes/Anotherbackground.gif';
import Stage3 from '../imagenes/waterfall.gif';
import Stage4 from '../imagenes/Fountain.gif';
import Stage5 from '../imagenes/fondoformulario.gif';
import Stage6 from '../imagenes/nightcamping.gif';
import Stage7 from '../imagenes/nightriver.gif';
import Stage8 from '../imagenes/Greenforest.gif';
import Stage9 from '../imagenes/Icybackground.gif';
import CompanionsGif from '../imagenes/aliados/Companions.gif';

import Tutorial from './tutorial.js';


const Layout = ({ children }) => {

  const backgroundImages = [Stage1, Stage2, Stage3, Stage4, Stage5, Stage6, Stage7, Stage8, Stage9];

  const enemyImages =[
    require('../imagenes/enemy1/Bat.gif'),
    require('../imagenes/enemy1/Tanuki.gif'),
    require('../imagenes/enemy1/JumpingSkull.gif'),
    require('../imagenes/enemy1/GlobeFish.gif'),
    require('../imagenes/enemy1/CandleEnemy.gif'),
    require('../imagenes/enemy1/MoaiEnemy.gif'),
    require('../imagenes/enemy1/PlasmaEnemy.gif'),
    require('../imagenes/enemy1/BirdEnemy.gif'),
    require('../imagenes/enemy1/ExplorerEnemy.gif'),
    require('../imagenes/enemy1/RealPinkGuy.gif')
  ];

  const session = {
    'UserExp': localStorage.getItem('UserExp'),
    'Fuerza': localStorage.getItem('Fuerza'),
    'Vida': localStorage.getItem('Vida'),
    'EnemyExp': localStorage.getItem('EnemyExp')
  }

  const UserExp = parseInt(session.UserExp);
  const Fuerza = parseInt(session.Fuerza);
  const Vida = parseInt(session.Vida);
  const EnemyExp = parseInt(session.EnemyExp);

  const [enemyImage, setEnemyImage] = useState(null);
  const [enemiesDefeated, setEnemiesDefeated] = useState(0);
  const [enemiesDefeatedBySec, setEnemiesDefeatedBySec] = useState(0);
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);

  const [characterInstance, setCharacterInstance] = useState(
    new Character(  
      UserData.Character.Nombre, 
      Fuerza
      )
  );// Crear una instancia de la clase Character
  
  const [enemyInstance, setEnemyInstance] = useState(
    new Enemy(
      UserData.Enemy.Nombre, 
      Vida,
      UserData.Enemy.Defensa,
      EnemyExp
    )
  ); // Crear una instancia de la clase Enemigo
  
  const [expData, setExpData] = useState(UserExp);       // Experiencia
  const [tempCount, setTempCount] = useState(2);        // Experiencia
  const [tutoIsOpen, setTutoIsOpen] = useState(false); // Tutorial
  // ------------------------------------------------------------------------------ //
  //FUNCION PARA ATACAR
  const attack = () => {

    console.log(characterInstance.fuerza);
    
    const newVida = enemyInstance.vida - characterInstance.fuerza;

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
        setEnemiesDefeated(prevEnemiesDefeated => prevEnemiesDefeated );
        spawnNewEnemy();
    }
  };
  // ------------------------------------------------------------------------------ //
  const [intervalId, setIntervalId] = useState(null);

  //FUNCION PARA ATACAR POR SEGUNDO
  const attackDamageSec = (damage) => {
    console.log("Daño que se va a hacer: " + damage);
    // Detener el temporizador anterior si
    if (intervalId) {
      clearInterval(intervalId);
    }
    // Crear un nuevo intervalo y almacenar su identificador
    const newIntervalId = setInterval(() => {
      console.log("Intervalo: " + newIntervalId);
  
      setEnemyInstance(prevEnemyInstance => {
        const newVida = prevEnemyInstance.vida - damage;
        const updatedEnemyInstance = new Enemy(
          prevEnemyInstance.nombre,
          newVida,
          prevEnemyInstance.defensa,
          prevEnemyInstance.exp
        );
        
        if (newVida <= 0 || isNaN(newVida)) {
          score();
          spawnNewEnemy();
          setEnemiesDefeated(prevEnemiesDefeated => prevEnemiesDefeated );
          return new Enemy(
            prevEnemyInstance.nombre,
            10 * tempCount,  // Reiniciar vida del enemigo
            prevEnemyInstance.defensa,
            prevEnemyInstance.exp
          );
          
        }
        
        return updatedEnemyInstance;
      });
  
    }, 1000); // 1000 milisegundos = 1 segundo
  
    // Almacenar el nuevo identificador de intervalo en el estado
    setIntervalId(newIntervalId);
  };

  // UseEffect para detener el intervalo cuando el componente se desmonta
  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);
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

  };  
  // ------------------------------------------------------------------------------ //\
  useEffect(() => {
    // Cargar la imagen de manera asíncrona
    const loadImage = () => {
        const randomImage = enemyImages[Math.floor(Math.random() * enemyImages.length)];
        const img = new Image();
        img.src = randomImage;

        img.onload = () => {
            setEnemyImage(randomImage);
            setShowImage(true);
        };
    };

    loadImage();
}, []);
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
      const onRecruitDamageSec = (newExp, damagesec) => {
      const damagesecVal = damagesec
      // Actualiza el estado de expData
      setExpData(newExp);
      // Llamada a la function
      attackDamageSec(damagesecVal);
    };

  // ------------------------------------------------------------------------------ //
  const changeBackground = () => {
    setBackgroundImageIndex((backgroundImageIndex + 1) % backgroundImages.length);
  };

  // FUNCION PARA EL PUNTAJE
  const score = () => {
    // Sumamos el puntaje
    setExpData(prevExpData => prevExpData + enemyInstance.exp);
    setTempCount(tempCount + 1);
    setEnemiesDefeated(prevEnemiesDefeated => {
      const updatedEnemiesDefeated = prevEnemiesDefeated + 1;
      if (updatedEnemiesDefeated % 10 === 0) {
        changeBackground();
      }
  
      return updatedEnemiesDefeated;
    });
  }
  const [showImage, setShowImage] = useState(false); // Estado para controlar la visibilidad de la imagen
    const handleStart = () => {
        setShowImage(true); // Mostrar la imagen cuando se hace clic en el botón "Comenzar"
    };

  return (
    <div className='container'>
      <div className='estadisticas'>
        <div >
          <header>
          <h1 className='titulogame'>
              <a>
                <img src={logo} alt="Logo" />
              </a>
          </h1>
          <p className='bienvenidaPlayer'>bienvenido {localStorage.getItem('User')}</p>

          <button className='tutorialButton' onClick={() => setTutoIsOpen(true)}>Tutorial</button>
          <Tutorial flag={tutoIsOpen} onClose={() => setTutoIsOpen(false)}>
 
          </Tutorial>
          <div className='reloj' id="reloj"></div>
          </header>
              
            <div id="reloj"></div>
            <span id="enemyHealth" className='spanenemy'> Resistencia: {enemyInstance.vida}</span>
            
            
            <div className="scoreboard">
              <span id="score"> Experiencia emocional : {expData}</span>
              {children}
            </div>
            <div className="scoreboard">
              <span id="enemiesDefeated" className=''> Desafios Superados: {enemiesDefeated}</span>
            </div>

            <RecruitComponent onRecruitExp={onRecruitExp} onRecruitDamage={onRecruitDamage} onRecruitDamageSec={onRecruitDamageSec} expData={expData}/>
            <div className="gif-container">
            <img src={CompanionsGif} alt="Companions" className="gif-component" />
            </div>
            

            <div className="barra-vida-container">
          <div className="barra-vida">
          <div
          className="vida-actual"
          style={{
            width: `${(enemyInstance.vida / (10 * tempCount)) * 100}%`,
            maxWidth: '100%',
          }}
       ></div>
          </div>
        </div>

            <SessionTime />  {/* tiempo */}
            {children}
        </div>

      </div>
      <div
        className="game-container"
        style={{
          backgroundImage: `url(${backgroundImages[backgroundImageIndex]})`,
        }}
      >
        <CharacterComponent/>
        <div className='enemycontainer'>
          {/* <div className="vidaenemigo">
            <span id="enemyHealth" className='spanenemy'> vida: {enemyInstance.vida}</span>
          </div> */}
          <div>

            {!showImage && (
            <button className='start-button' onClick={handleStart}>
              Comenzar
            </button>
            )}

              {showImage && (
                <button className='enemychange' onClick={attack}>
                  <img className='imageenemy' src={enemyImage} alt="" />
                </button>
              )}
          </div>
        </div>
        <Audiogame />
        <div className='guardarjson'>
          <SaveComponent UserData={UserData} CharacterData={characterInstance} EnemyData={enemyInstance} expData={expData}></SaveComponent>
        </div>
      </div> 
    </div>
  );
};

export default Layout;