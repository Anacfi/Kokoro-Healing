import React from 'react';
import '../../src/firstscreen.css'
import { Link } from 'react-router-dom';
import logo from '../imagenes/logo.png'; 

const Firstscreen = ()=> {
    return (
        <>
        <div>
            <div class="parent">
                <div className='tituloGame'>
                    <h2 className='titulo'>
                        <a>
                            <img src={logo} alt="Logo" />
                        </a>
                    </h2>
                </div>
                <div className='buttons'>
                    <Link to="/game"><button id="empezar" className='empezar'></button></Link>
                    <button id="continuar" className='continuar'></button>
                </div>
            </div> 
        </div> 
        </>
    )
  }
export default Firstscreen;