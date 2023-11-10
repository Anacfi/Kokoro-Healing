import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/stylesPP.css'

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      nombre: '',
      raza: '',
      objeto: '',
      color: '',
      sentimiento: '',
      coins: 0,
      enemyExp: 5,
      fuerza: 10, //Daño base
      userExp: 0,
      vida: 10,
      mostrarPrimerFormulario: true, // Mostrar el primer formulario inicialmente
      jugarHabilitado: false,
      cardSeleccionada: null,
    };
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      localStorage.setItem('User', this.state.user);
      localStorage.setItem('Coins', this.state.coins);
      localStorage.setItem('EnemyExp', this.state.enemyExp);
      localStorage.setItem('Fuerza', this.state.fuerza);
      localStorage.setItem('UserExp', this.state.userExp);
      localStorage.setItem('Vida', this.state.vida);

      this.setState({ jugarHabilitado: true });

      this.setState({
        user: '',
        nombre: '',
        raza: '',
        objeto: '',
        color: '',
        sentimiento: '',
      });
      this.setState({ mostrarPrimerFormulario: false });
      

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  }

  handleSubmit2 = (e) => {
    e.preventDefault();

    this.setState({ jugarHabilitado: true });
  }
  handleCardSeleccionada = (card) => {
    if (this.state.cardSeleccionada === card) {
      this.setState({ cardSeleccionada: null });
      localStorage.removeItem('cardSeleccionada');
    } else {
      this.setState({ cardSeleccionada: card });
      localStorage.setItem('cardSeleccionada', JSON.stringify(card));
    }
  }


  render() {
    const cards = [
      { id: 1, name: 'Perro' },
      { id: 2, name: 'Gato' },
      { id: 3, name: 'Ave' },
    ];
    console.log(this.handleCardSeleccionada)
    return (
      <>
      <div className='fondoform'>
        <div className='formularioreg'>
          <h1>Registro</h1>
          {this.state.mostrarPrimerFormulario ? (
          <form onSubmit={this.handleSubmit}>
            <label>
              Cual es tu nombre:
              <input type="text" name="user" value={this.state.user} onChange={this.handleChange} />
            </label>
            <br />
            <label>
              Nombre de tu mascota favorita:
              <input type="text" name="nombre" value={this.state.nombre} onChange={this.handleChange} />
            </label>
            {/* <label>
              Raza de Mascota favorita:
              <select type="select" name="raza" value={this.state.raza} onChange={this.handleChange} >
                <option>Seleccione</option>
                <option>Perro</option>
                <option>Gato</option>
                <option>Pajaro</option>
              </select>
    
            </label> */}
            <br />
            <label>
              Objeto con el que te sientas seguro:
              <input type="text" name="objeto" value={this.state.objeto} onChange={this.handleChange} />
            </label>
            <br />
            <label>
              Color favorito:
              <input type="text" name="color" value={this.state.color} onChange={this.handleChange} />
            </label>
            <br />
            {/* <label>
              Sentimiento mas invasivo:
              <input type="text" name="sentimiento" value={this.state.sentimiento} onChange={this.handleChange} />
            </label> */}
            <br />
            <button type="submit">Enviar</button>
          </form>
          ) : (
            <form onSubmit={this.handleSubmit2}>

                <h2>Selecciona una mascota:</h2>
                <div className="cards-container">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className={`card ${this.state.cardSeleccionada === card ? 'selected' : ''}`}
                      onClick={() => this.handleCardSeleccionada(card)}
                    >
                      {card.name}
                    </div>
                  ))}
                </div>
              </form>
          )}

          {this.state.jugarHabilitado && (
            <Link to="/game"><button onClick={this.iniciarJuego}>Jugar</button></Link>
          )}
        </div>
      </div>
      </>
      
    );
  }
}

export default Formulario;
