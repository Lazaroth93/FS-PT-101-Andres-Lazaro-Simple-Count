import React from 'react'
import ReactDOM from 'react-dom/client'

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

// index.css'
import '../styles/index.css'
// components
import Home from './components/Home';

const app = ReactDOM.createRoot(document.getElementById('root')); 
// Crea el punto raíz para renderizar el contenido de React en el elemento HTML con el ID 'root'.

let counter = 0; 
// Inicializa el contador en 0.

setInterval(() => {
    counter++; 
    // Incrementa el valor del contador en 1 cada segundo.

    app.render(
        <React.StrictMode>
            <Home counter={counter} /> 
            {/* Renderiza el componente Home, pasando el valor actual del contador como propiedad. */}
        </React.StrictMode>,
    );
}, 1000);
// Establece un intervalo que ejecuta la función cada 1000 ms (1 segundo),
// actualizando el contenido renderizado con el nuevo valor del contador.