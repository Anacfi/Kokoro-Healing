import React, { useState } from 'react';
import FileUploadModal from './uploadModal';
import '../../src/firstscreen.css'


function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleFileSelected = async (file) => {
    try {
      const reader = new FileReader();
  
      reader.onload = async (event) => {
        const fileData = JSON.parse(event.target.result); // Convertimos el archivo en JSON
        console.log(fileData);
  
        localStorage.setItem('User',fileData.User);
        localStorage.setItem('Coins',fileData.Coins);
        localStorage.setItem('UserExp',fileData.Exp);
        localStorage.setItem('Fuerza',fileData.Character.Fuerza);
        localStorage.setItem('Vida',fileData.Enemy.Vida);
        localStorage.setItem('EnemyExp',fileData.Enemy.exp);

      };
  
      // Esto inicia la lectura del archivo
      reader.readAsText(file);
    } catch (error) {
      console.error('Error al analizar el archivo JSON del usuario:', error);
    }


  };

  return (
    <>
      <button onClick={openModal} id="continuar" className='continuar'></button>
      <FileUploadModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onFileSelected={handleFileSelected}
      />
    </>
  );
}

export default Modal;
