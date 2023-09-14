class Character  {

  /**
   * 
   * @param {string} nombre Nombre del personaje
   * @param {Int16Array} fuerza Fuerza base del personaje en INT
   */


  constructor(nombre, fuerza) {
    this.nombre = nombre;
    this.fuerza = fuerza;

  }

  attack(enemigo, character) {

    let setEnemigo = (enemigo.vida) - (character.fuerza);

    return setEnemigo;
    
  }; 
  

  incrementAttack(character){

    let setCharacter = (character.fuerza + 1);

    return setCharacter;
  }
} 

export default Character;