import React, { useEffect } from 'react';

const SessionTime = () => {
  useEffect(() => {
    let segundos = 0;
    let intervalId; // Almacena el ID del intervalo para futura limpieza

    function actualizarReloj() {
      const horas = Math.floor(segundos / 3600).toString().padStart(2, '0');
      const minutos = Math.floor((segundos % 3600) / 60).toString().padStart(2, '0');
      const segundosFormateados = (segundos % 60).toString().padStart(2, '0');
      
      const tiempoActual = `${horas}:${minutos}:${segundosFormateados}`;
      document.getElementById('reloj').textContent = tiempoActual;
      
      segundos++;
    }
    
    // Iniciar el intervalo y almacenar su ID
    intervalId = setInterval(actualizarReloj, 1000); 

    // Limpiar el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, []); // El arreglo vacío [] asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div id="reloj">00:00:00</div>
  );
}

export default SessionTime;