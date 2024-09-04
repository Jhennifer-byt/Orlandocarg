import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import Login from '../routes/Login.jsx';
import PrivateRoute from '../routes/PrivateRoute.jsx';
import { AuthProvider } from '../Auth/AuthProvider.jsx';
import store from '../redux/store.jsx';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </React.StrictMode>
);