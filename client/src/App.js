import React, { Suspense, lazy, useRef } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import { NavbarData } from './staticData';
import logo from './imgvid/logo.png';
import { useState } from 'react';

const PortFolio = lazy(() => import('./pages/portfolio'));
const Admin = lazy(() => import('./Admin'));
const AdminAuthentication = lazy(() => import('./Admin/pages/Authentication'));
const Footer = lazy(() => import('./components/footer.js'));
const Service = lazy(() => import('./pages/Services'));

const ProtectedRoute = ({ user, children, navigate }) => {
  return user ? children : <Navigate to={navigate} />;
};

const NotFound = () => (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-2xl font-bold">Page Not Found</h1>
  </div>
);

const Hoc = ({ handleScroll, children,homeRef,productsRef,servicesRef,contactRef,clientRef }) => {
  

  return (
    <>
      <Navbar handleScroll={handleScroll} NavbarData={NavbarData}  />
      {children}
      <Footer logo={logo} handleScroll={handleScroll} />
    </>
  );
};

function App() {
  const AdminToken = document?.cookie?.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1];
  const homeRef = useRef(null);
  const productsRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();
  const clientRef = useRef(null);
  const [serviceRefClick,setServiceRefClick] = useState(false);
  const [productRefClick, setProductRefClick] = useState(false);
  const location = useLocation();

  const handleScroll = (section) => {
    if(location.pathname !== '/') navigate('/');
    const refs = {
      home: homeRef,
      products: productsRef,
      services: servicesRef,
      contact: contactRef,
      clients: clientRef,
    };
    console.log(refs[section]?.current, "ref");
    if(section === 'services'){
      setServiceRefClick(true);
      setProductRefClick(false);
    }
    if(section === 'products'){
      setProductRefClick(true);
      setServiceRefClick(false);
      }
      console.log(section)
    if (refs[section]?.current) {
      refs[section].current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest', duration: 60000 });
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Hoc handleScroll={handleScroll} homeRef={homeRef} productsRef={productsRef} servicesRef={servicesRef}  contactRef={contactRef} clientRef={clientRef}><PortFolio productRefClick={productRefClick} homeRef={homeRef} productsRef={productsRef} servicesRef={servicesRef} contactRef={contactRef} clientRef={clientRef} serviceRefClick={serviceRefClick} /></Hoc>} />
        <Route path="/admin/*" element={<ProtectedRoute user={AdminToken} navigate="/admin/login"><Admin /></ProtectedRoute>} />
        <Route path="/admin/login" element={<ProtectedRoute user={!AdminToken} navigate="/admin"><AdminAuthentication /></ProtectedRoute>} />
        <Route path="/service/:serviceName" element={<Hoc handleScroll={handleScroll} homeRef={homeRef} productsRef={productsRef} servicesRef={servicesRef}  contactRef={contactRef} clientRef={clientRef}><Service /></Hoc>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
