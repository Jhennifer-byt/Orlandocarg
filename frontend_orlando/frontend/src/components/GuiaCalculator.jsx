import React, { useState } from 'react';
import GuiaForm from './GuiaForm';
import Calculator from './Calculator';

const GuiaCalculator = () => {
  const [bultos, setBultos] = useState([]);
  const [guias, setGuias] = useState([]);
  const [precioFinal, setPrecioFinal] = useState(0);
  const [pesoGuia, setPesoGuia] = useState(0);
  const [volumenGuia, setVolumenGuia] = useState(0);

  const addGuia = (guia) => {
    setGuias([...guias, guia]);
  };

  const addBulto = (bulto) => {
    setBultos([...bultos, bulto]);
  };

  const eliminarCalculos = () => {
    setPrecioFinal(0);
    setBultos([]);
    setPesoGuia(0);
    setVolumenGuia(0);
  };

  return (
    <div className="guia-calculator-container">
      <div className="guia-calculator-box">
        <Calculator
          addBulto={addBulto}
          setPrecioFinal={setPrecioFinal}
          precioFinal={precioFinal}
          setPesoGuia={setPesoGuia}
          setVolumenGuia={setVolumenGuia}
        />
        <button className="btn btn-danger mt-3" onClick={eliminarCalculos}>Eliminar Cálculos</button>
        <GuiaForm
          precioFinal={precioFinal}
          pesoGuia={pesoGuia}
          volumenGuia={volumenGuia}
          addGuia={addGuia}
        />
      </div>
    </div>
  );
};

export default GuiaCalculator;
