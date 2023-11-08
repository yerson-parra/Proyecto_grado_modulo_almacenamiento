import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';
import EstacionesPage from './pages/EstacionesPage';
import { EstacionProvider } from './context/EstacionContext';
import EstacionesFormPage from './pages/EstacionesFormPage';
import { ClimaProvider } from './context/ClimaContext';
import ClimaFormPage from './pages/ClimaFormPage';
import CrearAdminPage from './pages/CrearAdminPage';
import ResetPassword from './pages/ResetPassword';
import SendEmailPage from './pages/SendEmailPage';

const App = () => {
  return (
    <AuthProvider>
      <EstacionProvider>
        <ClimaProvider>
          <BrowserRouter>
            <Navbar></Navbar>
            
            <main className='container mx-auto px-7 py-4'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/sendemail" element={<SendEmailPage />} />
              <Route element={<ProtectedRoute/>}>
                <Route path="/clima/:id" element={<ClimaFormPage/>} />
                <Route path="/estaciones" element={<EstacionesPage/>} />
                <Route path="/add-estaciones" element={<EstacionesFormPage />} />
                <Route path="/estaciones/:id" element={<EstacionesFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/crearAdmin" element={<CrearAdminPage />} />
              </Route>
            </Routes>
            </main>
          </BrowserRouter>
        </ClimaProvider>
      </EstacionProvider>
    </AuthProvider>
  );
};

export default App;