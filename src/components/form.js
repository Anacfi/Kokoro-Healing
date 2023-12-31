import React, { Component ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/stylesPP.css'
import perro from "../imagenes/aliados/WalkingDoggo.gif";
import gato from "../imagenes/aliados/KittyCat.gif";
import zorro from "../imagenes/aliados/PartyFox.gif";
import CharacterComponent from './character';

import perrohead from "../imagenes/aliados/Doggoface.gif";
import gatohead from "../imagenes/aliados/catface.gif";
import zorrohead from "../imagenes/aliados/foxface.gif";

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

      this.setState({
        user: '',
        nombre: '',
        raza: '',
        objeto: '',
        color: '',
        sentimiento: '',
      });
      this.setState({ mostrarPrimerFormulario: false });
      
      this.setState({jugarHabilitado: true})

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
      if (card.id === 1){
        const infoCard = {'id': card.id, 'image': perrohead, 'name': 'Perro'}
        console.log(infoCard);
        localStorage.setItem('cardSeleccionada', JSON.stringify(infoCard));
      }else if (card.id === 2){
        const infoCard = {'id': card.id, 'image': gatohead, 'name': 'Gato'}
        localStorage.setItem('cardSeleccionada', JSON.stringify(infoCard));

      }else if (card.id === 3){
        const infoCard = {'id': card.id, 'image': zorrohead, 'name': 'Gato'}
        localStorage.setItem('cardSeleccionada', JSON.stringify(infoCard));
      }
      //debugger; // Esto detendrá la ejecución del código aquí para que puedas inspeccionar el estado actual
    }
  }
  handleImageSelected = (imagenSeleccionada) => {
    this.setState({ imagenSeleccionada, showImage: true }); // Actualiza el estado showImage
  };
  
  render() {
    const cards = [
      { id: 1, name: 'Perro', image: perro },
      { id: 2, name: 'Gato', image: gato },
      { id: 3, name: 'Zorro', image: zorro},
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
                          <img src={card.image} alt={card.name} style={{ width: '200px', height: '200px' }} />
                          // Cambia los valores de width y height según tu preferencia
                        )}
                        {card.name === 'Gato' && (
                          <img src={card.image} alt={card.name} style={{ width: '200px', height: '200px' }}/>
                        )}
                        {card.name === 'Zorro' && (
                          <img src={card.image} alt={card.name} style={{ width: '200px', height: '200px' }}/>
                        )}
                        {card.name}
                        {!this.state.mostrarPrimerFormulario && !this.state.jugarHabilitado && (
                          <CharacterComponent
                            cardSeleccionada={card.image}
                            onImageSelected={this.handleImageSelected}
                          />
                        )}
                        
                      </div>
                    </Link>
                  ))}
                  
                </div>
              </form>
              
          )}

        </div>
      </div>
      </>
      
    );
  }
}

export default Formulario;
