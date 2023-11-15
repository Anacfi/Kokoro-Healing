import React, { Component ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/stylesPP.css'
import perro from "../imagenes/aliados/perro.png";
import gato from "../imagenes/aliados/gato.png";
import ave from "../imagenes/aliados/ave.png";
import CharacterComponent from './character';

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
      imagenSeleccionada: null,
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
    console.log('Tarjeta seleccionada:', card);
    if (this.state.cardSeleccionada === card) {
      this.setState({ cardSeleccionada: null, imagenSeleccionada: null });
      localStorage.removeItem('cardSeleccionada');
    } else {
      this.setState({ cardSeleccionada: card, imagenSeleccionada: card.image });
      localStorage.setItem('cardSeleccionada', JSON.stringify(card));
      debugger; // Esto detendrá la ejecución del código aquí para que puedas inspeccionar el estado actual
    }
  }
  handleImageSelected = (imagenSeleccionada) => {
    this.setState({ imagenSeleccionada, showImage: true }); // Actualiza el estado showImage
  };
  

  

  render() {
    const cards = [
      { id: 1, name: 'Perro', image: perro },
      { id: 2, name: 'Gato', image: gato },
      { id: 3, name: 'Ave', image: ave},
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
                     <Link to="/game" key={card.id}>
                      <div
                        key={card.id}
                        className={`card ${this.state.cardSeleccionada === card ? 'selected' : ''}`}
                        onClick={() => this.handleCardSeleccionada(card)}
                      >
                        {/* Aplicar estilos de ancho y alto a la imagen del perro */}
                        {card.name === 'Perro' && (
                          <img src={card.image} alt={card.name} style={{ width: '100px', height: '100px' }} />
                          // Cambia los valores de width y height según tu preferencia
                        )}
                        {card.name === 'Gato' && (
                          <img src={card.image} alt={card.name} style={{ width: '100px', height: '100px' }}/>
                        )}
                        {card.name === 'Ave' && (
                          <img src={card.image} alt={card.name} style={{ width: '100px', height: '100px' }}/>
                        )}
                        {card.name}
                      </div>
                    </Link>
                  ))}
                  
                </div>
              </form>
              
          )}
          {!this.state.mostrarPrimerFormulario && !this.state.jugarHabilitado && (
            <CharacterComponent
              cardSeleccionada={localStorage.getItem('cardSeleccionada') ? JSON.parse(localStorage.getItem('cardSeleccionada')) : null}
              onImageSelected={this.handleImageSelected}
            />
          )}

        </div>
      </div>
      </>
      
    );
  }
}

export default Formulario;
