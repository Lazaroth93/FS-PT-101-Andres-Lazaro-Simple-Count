import React, { useState, useEffect, useRef } from "react"; 

const InputStartNumber = ({ value, onChange, mode, counter, paused }) => {
  const [localValue, setLocalValue] = useState(String(value));
  const isEditing = useRef(false);

  useEffect(() => {
    if (!isEditing.current) {
      const displayVal =
        mode === "asc" ? value + counter : Math.max(value - counter, 0);
      setLocalValue(String(displayVal));
    }
  }, [value, counter, mode]);

  const handleChange = (e) => {
    let val = e.target.value;

    // Limitar longitud a 6 caracteres y permitir solo números
    if (val.length > 5) val = val.slice(0, 6);
    if (!/^\d*$/.test(val)) return; // No actualizar si hay caracteres no numéricos

    setLocalValue(val);
    isEditing.current = true;

    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    isEditing.current = false;
    const displayVal =
      mode === "asc" ? value + counter : Math.max(value - counter, 0);
    setLocalValue(String(displayVal));
  };

  return (
    <input
      type="number"
      className="form-control d-inline-block w-auto text-center"
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      min="0"
      max="99999"
    />
  );
};

const Controls = ({ mode, startNumber, setStartNumber, counter, paused }) => {
  return (
    <div
      className={`text-center mt-3 p-3 rounded ${
        mode === "asc" ? "bg-success bg-opacity-10" : "bg-danger bg-opacity-10"
      }`}
    >
      <h6 className={mode === "asc" ? "text-success" : "text-danger"}>
        {mode === "asc"
          ? "Contador Ascendente"
          : "Contador Descendente"}
      </h6>
      <label className="d-block mb-2">Número inicial (editable):</label>
      <InputStartNumber
        value={startNumber}
        onChange={setStartNumber}
        mode={mode}
        counter={counter}
        paused={paused}
      />
    </div>
  );
};

const Cells = ({ counter }) => {
  return (
    <div className="cells-content">
      {counter}
      <style jsx>{`
        .cells-content {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 600;
          user-select: none;
          text-align: center;
          width: 100%;
        }
        @media (max-width: 400px) {
          .cells-content {
            font-size: clamp(2rem, 6vw, 4rem);
          }
        }
      `}</style>
    </div>
  );
};

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [mode, setMode] = useState("asc"); // "asc" o "desc"
  const [paused, setPaused] = useState(false);
  const [startNumber, setStartNumber] = useState(0);
  const [inputKey, setInputKey] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [paused]);

  const valueToShow =
    mode === "desc" ? Math.max(startNumber - counter, 0) : startNumber + counter;

  useEffect(() => {
    if (mode === "desc" && valueToShow === 0 && !paused) {
      setPaused(true);
    }
  }, [valueToShow, mode, paused]);

  const toggleMode = () => {
    if (mode === "asc") {
      setStartNumber(valueToShow);
      setCounter(0);
      setPaused(false);
      setMode("desc");
    } else {
      setStartNumber(valueToShow);
      setCounter(0);
      setPaused(false);
      setMode("asc");
    }
    setInputKey((k) => k + 1);
  };

  const resetCounter = () => {
    setCounter(0);
    setStartNumber(0);
    setPaused(false);
    setMode("asc");
    setInputKey((k) => k + 1);
  };

  const togglePause = () => setPaused((p) => !p);

  const digitOne = valueToShow % 10;
  const digitTwo = Math.floor(valueToShow / 10) % 10;
  const digitThree = Math.floor(valueToShow / 100) % 10;
  const digitFour = Math.floor(valueToShow / 1000) % 10;
  const digitFive = Math.floor(valueToShow / 10000) % 10;

  let statusText = paused ? "Pausado" : "Activo";
  if (mode === "desc" && valueToShow === 0) statusText = "Terminado";

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <h4 className={darkMode ? "text-light" : "text-dark"}>
            {mode === "desc" ? "Cuenta regresiva" : "Contador ascendente"}
          </h4>
          <button
            className={`btn btn-sm ${
              darkMode ? "btn-light" : "btn-dark"
            } mt-2 mt-sm-0`}
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark/light mode"
          >
            {darkMode ? "Modo Claro" : "Modo Oscuro"}
          </button>
        </div>

        {/* Contenedor para centrar contador */}
        <div className="d-flex justify-content-center">
          <div className="row contador-container align-items-center my-5 g-1" style={{ gap: "1rem" }}>
            <div className="col-auto d-flex justify-content-center align-items-center">
              <Cells counter={<i className="fa-solid fa-clock fa-lg"></i>} />
            </div>
            {[digitFive, digitFour, digitThree, digitTwo, digitOne].map((digit, i) => (
              <div
                key={i}
                className="col-auto d-flex justify-content-center align-items-center"
                style={{ minWidth: "30px" }}
              >
                <Cells counter={digit} />
              </div>
            ))}
          </div>
        </div>

        <div
          className={`text-center mb-3 p-2 rounded ${
            statusText === "Activo"
              ? "bg-success bg-opacity-50"
              : statusText === "Pausado"
              ? "bg-warning bg-opacity-50"
              : "bg-danger bg-opacity-50"
          }`}
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            animation: statusText === "Activo" ? "pulse 2s infinite" : "none",
          }}
        >
          Estado: {statusText}
        </div>

        <div className="d-flex justify-content-center gap-3 flex-wrap mb-3">
          <button
            className={`btn ${
              mode === "asc" ? "btn-success" : "btn-danger"
            }`}
            onClick={toggleMode}
          >
            Cambiar a {mode === "asc" ? "Descendente" : "Ascendente"}
          </button>
          <button
            className={`btn ${paused ? "btn-success" : "btn-warning"}`}
            onClick={togglePause}
          >
            {paused ? "Reanudar" : "Pausar"}
          </button>
          <button className="btn btn-secondary" onClick={resetCounter}>
            Reset
          </button>
        </div>

        <Controls
          key={inputKey}
          mode={mode}
          startNumber={startNumber}
          setStartNumber={(num) => {
            setStartNumber(num);
            setCounter(0);
            setPaused(false);
          }}
          counter={counter}
          paused={paused}
        />
      </div>

    </div>
  );
};

export default Home;
