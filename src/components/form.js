import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      jugarHabilitado: false // Inicialmente, el juego no está habilitado
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      localStorage.setItem('User', this.state.user);

      // Se habilita la jugabilidad con los datos
      this.setState({ jugarHabilitado: true });

      // Reinicia el estado del formulario después de enviar
      this.setState({
        user: '',
        nombre: '',
        raza: '',
        objeto: '',
        color: '',
        sentimiento: '',
      });

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  }

  render() {
    return (
      <div>
        <h1>Formulario</h1>
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
          <br />
          <label>
            Raza de Mascota favorita:
            <input type="text" name="raza" value={this.state.raza} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Objeto con el que te sientas seguro en tu día a día:
            <input type="text" name="objeto" value={this.state.objeto} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Color favorito:
            <input type="text" name="color" value={this.state.color} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Sentimiento más invasivo:
            <input type="text" name="sentimiento" value={this.state.sentimiento} onChange={this.handleChange} />
          </label>
          <br />
          <button type="submit">Enviar</button>
        </form>

        {/* Muestra el botón "Jugar" si jugarHabilitado es true */}
        {this.state.jugarHabilitado && (
          <Link to="/game"><button onClick={this.iniciarJuego}>Jugar</button></Link>
        )}

      </div>
    );
  }
}

export default Formulario;
