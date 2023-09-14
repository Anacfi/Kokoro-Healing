import React from 'react';
import '../../src/firstscreen.css'

const Firstscreen = ()=> {
    return (
        <>
        <div>
            <div class="parent">
                <div className='tituloGame'>
                    <h2 className='titulo'>Kokoro Healing</h2>
                </div>
                <div className='buttons'>
                    <button id="empezar" className='empezar'></button>
                    <button id="continuar" className='continuar'></button>
                </div>
            </div> 
        </div> 
        </>
    )
  }
export default Firstscreen;