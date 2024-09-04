import React, { useState, useEffect } from 'react';
import { fetchClientes, enviarDatosGuia } from '../api/api';
import './GuiaForm.css';

function GuiaForm({ addGuia, precioFinal, pesoGuia, volumenGuia }) {
    const [fecha, setFecha] = useState('');
    const [cliente, setCliente] = useState('');
    const [clientes, setClientes] = useState([]);
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [numeroGuia, setNumeroGuia] = useState('');
    const [precioTotal, setPrecioTotal] = useState(precioFinal);
    const [estado, setEstado] = useState('pendiente');
    const [cantidad, setCantidad] = useState(0);
    const [esPrivilegiado, setEsPrivilegiado] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [descuentoManual, setDescuentoManual] = useState(0);
    const [descuentoActivado, setDescuentoActivado] = useState(false);
    const [pesoTotalGuia, setPesoTotalGuia] = useState(pesoGuia || 0);
    const [mensajeExito, setMensajeExito] = useState('');

    useEffect(() => {
        const getClientes = async () => {
            try {
                const data = await fetchClientes();
                setClientes(data);
            } catch (error) {
                console.error('Hubo un error al traer los clientes:', error);
            }
        };

        getClientes();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const result = clientes.filter(c =>
                c.nombre.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredClientes(result);
            setShowDropdown(true);
        } else {
            setFilteredClientes([]);
            setShowDropdown(false);
        }
    }, [searchQuery, clientes]);

    useEffect(() => {
        const clienteSeleccionado = clientes.find(c => c.nombre === cliente);
        if (clienteSeleccionado) {
            setEsPrivilegiado(clienteSeleccionado.es_privilegiado);
            const nuevoPrecio = clienteSeleccionado.es_privilegiado ? precioFinal * 0.7 : precioFinal;
            setPrecioTotal(nuevoPrecio);
        } else {
            setEsPrivilegiado(false);
            setPrecioTotal(precioFinal);
        }
    }, [cliente, clientes, precioFinal]);

    useEffect(() => {
        if (descuentoActivado) {
            const precioConDescuento = precioTotal - descuentoManual;
            setPrecioTotal(precioConDescuento > 0 ? precioConDescuento : 0);
        } else {
            setPrecioTotal(precioFinal);
        }
    }, [descuentoManual, descuentoActivado, precioFinal]);

    useEffect(() => {
        setPesoTotalGuia(pesoGuia);
    }, [pesoGuia]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const clienteSeleccionado = clientes.find(c => c.nombre === cliente);

        if (!clienteSeleccionado) {
            alert('Debes seleccionar un cliente válido.');
            return;
        }

        if (numeroGuia.length !== 5 || isNaN(numeroGuia)) {
            alert('El número de guía debe contener exactamente 5 dígitos numéricos.');
            return;
        }

        const guiaData = {
            fecha: fecha,
            cliente: clienteSeleccionado.id,
            numero_guia: numeroGuia,
            precio_total: parseFloat(precioTotal).toFixed(2),
            estado: estado,
            cantidad: cantidad,
            peso: parseFloat(pesoTotalGuia),
            volumen: volumenGuia,
        };

        try {
            const response = await enviarDatosGuia(guiaData);
            if (response.ok) {
                console.log('Datos enviados exitosamente');
                addGuia(guiaData);
                setMensajeExito('Guía registrada exitosamente.');
            } else {
                console.error('Error al enviar los datos');
            }
        } catch (error) {
            console.error('Hubo un error al enviar los datos:', error);
        } finally {
            // Limpiar los inputs después de intentar enviar el formulario
            setFecha('');
            setCliente('');
            setNumeroGuia('');
            setPrecioTotal(0);
            setCantidad(0);
            setDescuentoManual(0);
            setDescuentoActivado(false);
            setPesoTotalGuia(0);
            setSearchQuery('');
        }
    };

    return (
        <div>
            <h2>Formulario de Guía</h2>
            {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Fecha:</label>
                    <input type="date" className="form-control" value={fecha} onChange={e => setFecha(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cliente:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        required
                    />
                    {showDropdown && (
                        <ul className="list-group">
                            {filteredClientes.map(c => (
                                <li
                                    key={c.id}
                                    className="list-group-item"
                                    onClick={() => {
                                        setCliente(c.nombre);
                                        setSearchQuery(c.nombre);
                                        setShowDropdown(false);
                                    }}
                                >
                                    {c.nombre} {c.es_privilegiado ? '(Privilegiado)' : '(Normal)'}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Número de Guía (5 caracteres):</label>
                    <input type="text" className="form-control" value={numeroGuia} onChange={e => setNumeroGuia(e.target.value)} maxLength="5" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Estado:</label>
                    <select className="form-select" value={estado} onChange={e => setEstado(e.target.value)} required>
                        <option value="pendiente">Pendiente</option>
                        <option value="enviado">Enviado</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Cantidad de Paquetes:</label>
                    <input type="number" className="form-control" value={cantidad} onChange={e => setCantidad(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Peso Total (kg):</label>
                    <input type="number" className="form-control" value={pesoTotalGuia} onChange={e => setPesoTotalGuia(e.target.value)} readOnly />
                </div>

                <div className="mb-3">
                    <label className="form-label">Precio Total (S/):</label>
                    <input type="number" className="form-control" value={precioTotal} readOnly />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descuento Manual (S/):</label>
                    <input
                        type="number"
                        className="form-control"
                        value={descuentoActivado ? descuentoManual : ''}
                        onChange={e => setDescuentoManual(parseFloat(e.target.value))}
                        disabled={!descuentoActivado}
                        placeholder={descuentoActivado ? 'Ingrese descuento en soles' : ''}
                    />
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={descuentoActivado}
                            onChange={e => setDescuentoActivado(e.target.checked)}
                        />
                        <label className="form-check-label">Aplicar descuento</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Registrar Guía</button>
            </form>
        </div>
    );
}

export default GuiaForm;
