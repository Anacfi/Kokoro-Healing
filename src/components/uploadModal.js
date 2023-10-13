import React, { useState } from 'react';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import '../styles/stylesPP.css'

Modal.setAppElement('#root');

function FileUploadModal({ isOpen, onRequestClose, onFileSelected }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handleUpload = () => {
    // Llama a la función onFileSelected con el archivo seleccionado
    if (selectedFile) {
      onFileSelected(selectedFile);
    }
  };

  return (
    <>
    <div className='modalinsert'>
      <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Subir Archivo"

      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro transparente
          backdropFilter: 'blur(3px)', // Filtro de fondo
        },
        content: {
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo blanco semitransparente
          textAlign: 'center', // Alineación del texto
          boxShadow: '0 0 25px #222', // Sombra del contenido
          width: '300px', // Ancho del modal
          margin: 'auto', // Centrar horizontalmente
          border: '1px solid #ccc', // Borde
          borderRadius: '5px', // Bordes redondeados
          padding: '20px' // Espaciado interno
        }
      }}
    >
      <h2>Subir Archivo</h2>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Arrastra un archivo aquí o haz clic para seleccionar uno.</p>
            {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
          </div>
        )}
      </Dropzone>
      <button onClick={handleUpload}>Subir</button>
      <Link to="/game"><button>Jugar</button></Link>
    </Modal>
    </div>
    </>
  );
}

export default FileUploadModal;
