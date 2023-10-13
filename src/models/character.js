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
  

  incrementAttack(character){

    let setCharacter = (character.fuerza + 1);

    return setCharacter;
  };

  attackDamageSec(enemigo, damagesec) {

    let setEnemigo = (enemigo.vida) - (damagesec);
    
    return setEnemigo;
    
  }; 
} 

export default Character;