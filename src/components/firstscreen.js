import React from 'react';
import '../../src/firstscreen.css'
import { Link } from 'react-router-dom';


const Firstscreen = ()=> {
    return (
        <>
        <div>
            <div class="parent">
                <div className='tituloGame'>
                    <h2 className='titulo'>Kokoro Healing</h2>
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