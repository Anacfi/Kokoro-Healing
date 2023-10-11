// import './App.css';
// import Layout from './components/layout';
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Firstscreen from './components/firstscreen';
import Layout from './components/layout';
import Formulario from './components/form';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Firstscreen />} />
            <Route path="/nuevoJuego" element={<Formulario />} />
            <Route path="/game" element={<Layout />} />
            {/* Agrega tus rutas aquí */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
