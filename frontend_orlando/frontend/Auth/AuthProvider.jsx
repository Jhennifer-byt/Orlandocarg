import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true); // Nuevo estado de carga

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdminLocal = localStorage.getItem('isAdmin') === 'true';

        if (token) {
            setIsAuthenticated(true);
            setIsAdmin(isAdminLocal);
        }
        setLoading(false); // La verificación ha terminado
    }, []);

    const logout = async () => {
        try {
            await axios.post('/api/v1/auth/logout/');
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            setIsAuthenticated(false);
            setIsAdmin(false);
        } catch (error) {
            console.error('Error al hacer logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
