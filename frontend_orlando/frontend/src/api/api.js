import { useAuth } from '../../Auth/AuthProvider';  // Importa el hook useAuth

import axios from 'axios';

// api/api.js
export const enviarDatosGuia = async (data) => {
    try {
        const response = await fetch('http://localhost:8000/api/v1/guias/', {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Obtener los datos del error
            console.error('Error en enviarDatosGuia:', errorData);
            throw new Error(`HTTP error! Status: ${response.status} - ${errorData.detail || 'Unknown error'}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en enviarDatosGuia:', error);
        throw error; // Asegúrate de que el error sea lanzado para manejarlo en el componente
    }
};


export const marcarComoEnviado = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Obtén el token de localStorage
      const response = await axios.post(
        'http://localhost:8000/api/v1/marcar_como_enviado/', 
        { id: id },  // Aquí envías el 'id'
        {
          headers: {
            'Authorization': `Token ${token}`, // Incluye el token en los encabezados
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Hubo un error al marcar la guía como enviada:', error);
    }
  };
  

const API_URL_CLIENTES = 'http://localhost:8000/api/v1/clientes/'; // Asegúrate de que esta URL sea correcta

export const fetchClientes = async () => {
    try {
        const response = await fetch(API_URL_CLIENTES, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            console.error("Error en la respuesta:", response.statusText);
            return [];
        }
    } catch (error) {
        console.error("Error fetching clients:", error);
        return [];
    }
};



const API_URL_GUIAS = 'http://localhost:8000/api/v1/guias/';

export const fetchGuias = async (filters = {}) => {
    try {
        // Construir los parámetros de consulta
        const queryParams = new URLSearchParams(filters);

        // Hacer la petición con los parámetros de consulta
        const responseGuias = await fetch(`${API_URL_GUIAS}?${queryParams.toString()}`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (responseGuias.ok) {
            const guias = await responseGuias.json();
            const clientes = await fetchClientes();

            // Hacer la coincidencia entre guías y clientes
            const guiasConClientes = guias.map(guia => {
                const cliente = clientes.find(c => c.id === guia.cliente);
                return { ...guia, clienteNombre: cliente ? cliente.nombre : 'Desconocido' };
            });

            return guiasConClientes; // Devuelve las guías con los nombres de los clientes
        } else {
            console.error("Error en la respuesta:", responseGuias.statusText);
            return [];
        }
    } catch (error) {
        console.error("Error fetching guías:", error);
        return [];
    }
};