// Layout.js
import UserData from '../sessions/data.json'; // JSON del Character
import Character from '../models/character';
import Enemy from '../models/enemy';
import React, { useEffect, useState } from 'react';
import Message from './message';
import SessionTime from './sessionTime';
import RecruitComponent from './RecruitComponent.js';
import SaveComponent from './saveSessionComponent';
import '../styles/stylesPP.css'
import logo from '../imagenes/logo.png'; 
import aliado from '../imagenes/aliados/aliado.png';

const Layout = ({ children }) => {

  const enemyImages =[
    require('../imagenes/enemy1/BUHO.png'),
    require('../imagenes/enemy1/HONGO.png'),
    require('../imagenes/enemy1/MURCIELAGO.png'),
    require('../imagenes/enemy1/PÉSCADO.png'),
    require('../imagenes/enemy1/SOMBRERIN.png'),
    require('../imagenes/enemy1/mirror.png'),
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
  const [tempCount, setTempCount] = useState(2);       // Experiencia

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
        spawnNewEnemy();
    }
  };

  // ------------------------------------------------------------------------------ //
  
  const [intervalId, setIntervalId] = useState(null);

  //FUNCION PARA ATACAR POR SEGUNDO
  const attackDamageSec = (damage) => {
    console.log("Daño que se va a hacer: " + damage);
  
    // Detener el temporizador anterior si existe
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
    //   // Cambiar el color de fondo aleatoriamente
    // let enemy = document.querySelector(".enemy");
    // enemy.style.backgroundColor = RANDOMCOLOR();
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

  // FUNCION PARA EL PUNTAJE
  const score = () => {
    // Sumamos el puntaje
    setExpData(expData+enemyInstance.exp);
    setTempCount(tempCount + 1);
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
          </header>
          <Message />
          <p>Bienvenido a nuestro juego clicker {localStorage.getItem('User')}</p>
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

        <div className='guardarjson'>
          <SaveComponent UserData={UserData} CharacterData={characterInstance} EnemyData={enemyInstance} expData={expData}></SaveComponent>
        </div>
      </div> 
    </div>
    

  );
};

export default Layout;