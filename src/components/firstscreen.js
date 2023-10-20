import React from 'react';
import '../../src/firstscreen.css'
import { Link } from 'react-router-dom';
import logo from '../imagenes/logo.png'; 
import Modal from './modalSession';

const Firstscreen = ()=> {

    return (
        <>
        <div>
            <div className="parent">
                <div className='tituloGame'>
                    <h2 className='titulo'>
                        <a>
                            <img src={logo} alt="Logo" />
                        </a>
                    </h2>
                </div>
                <div className='buttons'>
                    <Link to="/nuevoJuego"><button id="empezar" className='empezar'></button></Link>
                    <Modal/>
                </div>
            </div> 
        </div> 
        </>
    )
  }
export default Firstscreen;