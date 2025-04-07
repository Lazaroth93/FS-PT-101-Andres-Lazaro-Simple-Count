import React from "react"; // Importa React para usar componentes y JSX.
import { Cells } from "./Cells"; // Importa el componente "Cells".

// Crea un componente funcional llamado "Home".
const Home = (props) => {
  // Calcula los dígitos individuales del contador recibido en las propiedades.
  let digitOne = props.counter % 10; // Dígito de las unidades.

// Calcula el dígito de las unidades del valor de props.counter.
// Usa el operador % 10 (módulo) para obtener el residuo de la división de props.counter entre 10.
// Esto extrae el último dígito del número, que representa las unidades.

  let digitTwo = Math.floor(props.counter / 10) % 10; // Dígito de las decenas.
  let digitTree = Math.floor(props.counter / 100) % 10; // Dígito de las centenas.
  let digitFour = Math.floor(props.counter / 1000) % 10; // Dígito de los millares.
  let digitFive = Math.floor(props.counter / 10000) % 10; // Dígito de las decenas de millar.

// Calcula el dígito de las decenas del valor de props.counter.
// 1. Divide props.counter entre 10 para eliminar las unidades y desplazar los dígitos hacia la derecha.
// 2. Usa Math.floor() para redondear hacia abajo y obtener solo la parte entera del resultado.
// 3. Aplica el operador % 10 para obtener el último dígito (el de las decenas).

  // Renderiza el contenido HTML usando el componente Cells.
  return (
    <div className="container"> {/* Contenedor principal. */}
      <div className="row m-4 justify-content-center">
        {/* Renderiza los dígitos y un ícono de reloj */}
        <Cells counter={<i class="fa-solid fa-clock"></i>} /> {/* Ícono de reloj. */}
        <Cells counter={digitFive} /> {/* Décimas de millar. */}
        <Cells counter={digitFour} /> {/* Millar. */}
        <Cells counter={digitTree} /> {/* Centena. */}
        <Cells counter={digitTwo} /> {/* Decena. */}
        <Cells counter={digitOne} /> {/* Unidad. */}
      </div>
    </div>
  );
};

export default Home; // Exporta el componente para que pueda usarse en otros archivos.