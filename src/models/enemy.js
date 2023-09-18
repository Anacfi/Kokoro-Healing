class Enemy {

  /**
   * 
   * @param {string} nombre 
   * @param {int} vida 
   * @param {int} defensa 
   * @param {int} exp 
   */
  constructor(nombre, vida, defensa, exp){
    this.nombre = nombre;
    this.vida = vida;
    this.defensa = defensa;
    this.exp = exp;
  }

  incrementExp(enemyInstance){
  
    let setEnemy = (enemyInstance.exp + 2);

    return setEnemy;
  }
  
}



export default Enemy;