import { useEffect } from 'react';

const SessionTime = () => {
  useEffect(() => {
    let segundos = 0;

    function actualizarReloj() {
      const horas = Math.floor(segundos / 3600).toString().padStart(2, '0');
      const minutos = Math.floor((segundos % 3600) / 60).toString().padStart(2, '0');
      const segundosFormateados = (segundos % 60).toString().padStart(2, '0');
      
      const tiempoActual = `${horas}:${minutos}:${segundosFormateados}`;
      document.getElementById('reloj').textContent = tiempoActual;
      
      segundos++;
    }
    
    // Actualizar el reloj cada segundo
    setInterval(actualizarReloj, 1000); 
  }, []); // El arreglo vacío [] asegura que este efecto se ejecute solo una vez al montar el componente

}

export default SessionTime;