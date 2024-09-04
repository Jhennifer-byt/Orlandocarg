import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';  // Importa el hook useAuth
import './Login.css'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { setIsAuthenticated, setIsAdmin } = useAuth();  // Obtén setIsAuthenticated y setIsAdmin desde el contexto

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/v1/auth/login/', { username, password }, { withCredentials: true })
            .then(response => {
                const token = response.data.token;
                const isAdmin = response.data.is_admin;
                
                localStorage.setItem('token', token);
                localStorage.setItem('isAdmin', isAdmin);

                setIsAuthenticated(true);  // Actualiza el estado de autenticación usando el contexto
                setIsAdmin(isAdmin);        // Actualiza el estado de admin usando el contexto
                navigate('/');
            })
            .catch(error => {
                setError('Credenciales inválidas');
                console.error('Error de autenticación:', error);
            });
    };



    return (
        <div className="login-page">
            <div className="login-box">
                <h1 className="login-title">Bienvenido</h1>
                <h3 className="login-subtitle">Ingresa tus credenciales para acceder</h3>
                <form onSubmit={handleSubmit} className="login-form">
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="login-input"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="login-input"
                    />
                    <Button type="submit" variant="primary" className="login-button">Login</Button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
