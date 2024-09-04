import React, { useState, useEffect } from 'react';
import { fetchGuias, marcarComoEnviado } from '../api/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TaskList.css'; // Asegúrate de incluir este archivo CSS en tu proyecto

function TaskList() {
  const [guiaList, setGuiaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const getGuiaList = async () => {
    try {
      const data = await fetchGuias({ date: filterDate, status: filterStatus });
      setGuiaList(data);
    } catch (error) {
      console.error('Hubo un error al traer las guías:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGuiaList();
  }, [filterDate, filterStatus]);

  const handleMarcarComoEnviado = async (idGuia) => {
    try {
      await marcarComoEnviado(idGuia);
      await getGuiaList();
    } catch (error) {
      console.error('Hubo un error al marcar la guía como enviada:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Guías</h2>
      <div className="d-flex mb-3">
        <input 
          type="date" 
          value={filterDate} 
          onChange={(e) => setFilterDate(e.target.value)}
          className="form-control me-3"
        />
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="form-select"
        >
          <option value="">Todos</option>
          <option value="pendiente">Pendientes</option>
          <option value="enviado">Enviados</option>
        </select>
      </div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Número de Guía</th>
              <th>Precio Total</th>
              <th>Estado</th>
              <th>Cantidad de Bultos</th>
              <th>Peso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {guiaList.map((guia, index) => (
              <tr key={index}>
                <td>{guia.fecha}</td>
                <td>{guia.clienteNombre || 'Cliente no disponible'}</td>
                <td>{guia.numero_guia}</td>
                <td>{guia.precio_total}</td>
                <td>{guia.estado}</td>
                <td>{guia.cantidad}</td>
                <td>{guia.peso}</td>
                <td>
                  {guia.estado === 'pendiente' && (
                    <button className="btn btn-success" onClick={() => handleMarcarComoEnviado(guia.id)}>
                      Marcar como Enviado
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;
