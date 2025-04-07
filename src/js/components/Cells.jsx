import React from "react"; // Importa React para usar componentes y JSX.

// Define un componente funcional llamado "Cells".
// Este componente recibe propiedades (props) para renderizar contenido dinámico.
export const Cells = (props) => {
  return (
    // Renderiza un div con estilos de Bootstrap y muestra el valor recibido en props.counter.
    <div className="col-lg-2 col-sm-12 bg-dark text-white text-center p-5 display-6 fw-semibold">
      {props.counter} {/* Muestra el contenido dinámico del contador. */}
    </div>
  );
};