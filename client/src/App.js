// src/App.js
import React from 'react';
import {  Navigate, Route, Routes } from 'react-router-dom';
import PortFolio from './pages/portfolio';
import Admin from './Admin';
import AdminAuthentication from './Admin/pages/Authentication';


const ProtectedRoute = ({ user, children, navigate }) => {
  return user ? children : <Navigate to={navigate} />;
};

function App() {
  const AdminToken = document?.cookie?.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];
  return (
   
      <Routes>
        <Route path="/" element={<PortFolio/>} />
      <Route path="/admin/*" element={<ProtectedRoute user={AdminToken} navigate="/admin/login"><Admin /></ProtectedRoute>} />
      <Route path="/admin/login" element={<ProtectedRoute user={!AdminToken} navigate="/admin"><AdminAuthentication /></ProtectedRoute>} />
       
      </Routes>
  
  );
}

export default App;