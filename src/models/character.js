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

  attack(enemigo) {
    console.log("Fuerza : " + this.fuerza);
    console.log("Vida Enemigo : " + enemigo.vida);
    console.log("Defensa Enemigo : " + enemigo.defensa);

    let setEnemigo = (enemigo.vida + enemigo.defensa) - this.fuerza;
    console.log("vida del enemigo despues del ataque: " + setEnemigo);

    return setEnemigo;
    
  };
}

export default Character;