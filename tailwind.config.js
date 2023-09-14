// tailwind.config.js
module.exports = {
  // Otras configuraciones...

  plugins: [
    // Otras configuraciones de plugins...
    require('@tailwindcss/forms'),
  ],

  // Configuración de variantes
  variants: {
    extend: {},
  },

  // Personalización de colores
  theme: {
    extend: {
      colors: {
        primary: '#ff5722',
        secondary: '#3f51b5',
        // Agrega otros colores personalizados si es necesario
      },
    },
  },

  // Agregar clases personalizadas
  extend: {
    // Agrega tus clases personalizadas aquí
    // Ejemplo:
    // 'custom-class': 'font-bold text-lg text-red-500',
  },
};



