// src/App.js
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import { NavbarData } from './staticData';
import logo from './imgvid/logo.png';
const PortFolio = lazy(() => import('./pages/portfolio'));
const Admin = lazy(() => import('./Admin'));
const AdminAuthentication = lazy(() => import('./Admin/pages/Authentication'));
const Footer = lazy(() => import('./components/footer.js'));
const Service = lazy(() => import('./pages/Services'));
const ProtectedRoute = ({ user, children, navigate }) => {
  return user ? children : <Navigate to={navigate} />;
};

const NotFound = () => (
  <div className="flex justify-center items-center h-screen">
    <h1 className="text-2xl font-bold">Page Not Found</h1>
  </div>
);



const Hoc = ({children}) => {
  return (
    <>
      <Navbar NavbarData={NavbarData} />
      {children}
      <Footer logo={logo} />
    </>
  );
};

function App() {
  const AdminToken = document?.cookie?.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Hoc><PortFolio /></Hoc>} />
        <Route path="/admin/*" element={<ProtectedRoute user={AdminToken} navigate="/admin/login"><Admin /></ProtectedRoute>} />
        <Route path="/admin/login" element={<ProtectedRoute user={!AdminToken} navigate="/admin"><AdminAuthentication /></ProtectedRoute>} />
        <Route path="/service/:serviceName" element={<Hoc><Service /></Hoc>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;