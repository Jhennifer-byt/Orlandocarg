import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from '../routes/Navbar';
import TaskList from './components/TaskList';
import Login from '../routes/Login';
import GuiaCalculator from './components/GuiaCalculator';
import { useAuth } from '../Auth/AuthProvider';

function App() {
  const { isAuthenticated, isAdmin, loading } = useAuth(); // Incluye loading

  if (loading) {
    return <div>Loading...</div>; // O algún tipo de indicador de carga
  }

  return (
    <div className="App">
      <Router>
        {isAuthenticated && <NavbarComponent />}
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={isAuthenticated ? (isAdmin ? <GuiaCalculator /> : <Navigate to="/tasks" />) : <Navigate to="/login" />} 
          />
          <Route path="/tasks" element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? (isAdmin ? "/" : "/tasks") : "/login"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
