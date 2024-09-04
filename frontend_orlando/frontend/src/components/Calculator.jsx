import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import cubeImage from '../image/cubeImage.jpg';

function Calculator({ addBulto, setPrecioFinal, precioFinal = 0, setPesoGuia, setVolumenGuia }) {
    const [peso, setPeso] = useState(0);
    const [ancho, setAncho] = useState(0);
    const [alto, setAlto] = useState(0);
    const [fondo, setFondo] = useState(0);
    const [tipoCliente, setTipoCliente] = useState('general');
    const [precioPeso, setPrecioPeso] = useState(0);
    const [precioVolumen, setPrecioVolumen] = useState(0);
    const [calculado, setCalculado] = useState(false);

    useEffect(() => {
        setPeso(0);
        setAncho(0);
        setAlto(0);
        setFondo(0);
        setTipoCliente('general');
    }, [calculado]);

    const calcularPrecio = () => {
        const precioPesoGeneral = peso * 0.35;
        const precioPesoPrivilegiado = peso * 0.25;
        const precioPesoOtro = peso * 0.40;  // Cambio para ejemplo
        
        let volumen;
        if (tipoCliente === 'privilegiado') {
            volumen = (ancho / 100 * alto / 100 * fondo / 100) * 80; // Cálculo del volumen para cliente privilegiado
        } else {
            volumen = (ancho / 100 * alto / 100 * fondo / 100) * 100; // Cálculo del volumen para cliente general o "otro"
        }

        volumen = parseFloat(volumen.toFixed(2)); // Redondear el volumen a dos decimales

        let precioPesoCalculado;
        if (tipoCliente === 'privilegiado') {
            precioPesoCalculado = precioPesoPrivilegiado;
        } else if (tipoCliente === 'otro') {
            precioPesoCalculado = precioPesoOtro;
        } else {
            precioPesoCalculado = precioPesoGeneral;
        }

        setPrecioPeso(precioPesoCalculado);
        setPrecioVolumen(volumen);
        setCalculado(true);

        setPesoGuia(peso);
        setVolumenGuia(volumen);

        addBulto({ precioPeso: precioPesoCalculado, volumen });
    };

    const elegirPrecio = async (precio) => {
        setPrecioFinal(prevPrecioFinal => prevPrecioFinal + precio);
        setCalculado(false);
    };

    return (
        <div className="container mt-4">
            <h2>Calculadora de Precios</h2>
            <div className="d-flex">
                <div style={{ flex: 1 }}>
                    <div className="mb-3">
                        <label className="form-label">Peso (kg):</label>
                        <input type="number" className="form-control" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Peso (kg)" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Ancho (cm):</label>
                        <input type="number" className="form-control" value={ancho} onChange={e => setAncho(e.target.value)} placeholder="Ancho (cm)" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Alto (cm):</label>
                        <input type="number" className="form-control" value={alto} onChange={e => setAlto(e.target.value)} placeholder="Alto (cm)" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fondo (cm):</label>
                        <input type="number" className="form-control" value={fondo} onChange={e => setFondo(e.target.value)} placeholder="Fondo (cm)" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tipo de Cliente:</label>
                        <select className="form-select" value={tipoCliente} onChange={e => setTipoCliente(e.target.value)}>
                            <option value="general">General</option>
                            <option value="privilegiado">Privilegiado</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                    <button className="btn btn-primary mb-3" onClick={calcularPrecio}>Calcular</button>
                    {calculado && (
                        <div>
                            <h3>Precios Calculados</h3>
                            <p>Precio por Peso: {precioPeso !== undefined ? precioPeso.toFixed(2) : 'N/A'}</p>
                            <button className="btn btn-success me-2" onClick={() => elegirPrecio(precioPeso)}>Elegir Precio por Peso</button>
                            <p>Precio por Volumen: {precioVolumen !== undefined ? precioVolumen.toFixed(2) : 'N/A'}</p>
                            <button className="btn btn-success me-2" onClick={() => elegirPrecio(precioVolumen)}>Elegir Precio por Volumen</button>
                        </div>
                    )}
                    <h3>Precio Final: {precioFinal !== undefined ? precioFinal.toFixed(2) : 'N/A'}</h3>
                </div>

                <div className="ms-4">
                    <h4>Referencia de Dimensiones</h4>
                    <img src={cubeImage} alt="Cubo 3D" style={{ width: '200px', height: '200px' }} />
                </div>
            </div>
        </div>
    );
}

export default Calculator;
