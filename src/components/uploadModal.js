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
    // Cierra la ventana modal
    onRequestClose();
  };

  return (
    <>
    <div className='modalinsert'>
      <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Subir Archivo"
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
      <Link to="/game"><button onClick={handleUpload}>Subir</button></Link>
    </Modal>
    </div>
    </>
  );
}

export default FileUploadModal;
