import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// KOMPONENTLƏR
import Header from './components/Header';

// SƏHİFƏLƏR
import Login from './pages/Login';
import Dashboard from './pages/DashBoard.jsx'; // Nəzarət Mərkəzi
import Warehouses from './pages/Warehouses'; // Anbarların siyahısı (Yeni)
import WarehouseDetail from './pages/WarehouseDetail'; // Anbarın daxili (Mallar)
import Projects from './pages/Projects'; // Layihə siyahısı
import ProjectDetail from './pages/ProjectDetail'; // Layihə idarəetmə və smeta
import Statistics from './pages/Statistics';
import Reports from './pages/Reports';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans selection:bg-indigo-500 selection:text-white">
        
        {/* Giriş edilibsə Naviqasiya Menyu görünsün */}
        {isAuthenticated && <Header onLogout={handleLogout} />}

        <main className="animate-in fade-in duration-700">
          <Routes>
            {/* LOGIN & AUTH */}
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} 
            />
            
            {/* ANA SƏHİFƏ (DASHBOARD) */}
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            
            {/* ANBAR MODULU */}
            <Route path="/warehouses" element={isAuthenticated ? <Warehouses /> : <Navigate to="/login" />} />
            <Route path="/warehouse/:id" element={isAuthenticated ? <WarehouseDetail /> : <Navigate to="/login" />} />
            
            {/* LAYİHƏ MODULU */}
            <Route path="/projects" element={isAuthenticated ? <Projects /> : <Navigate to="/login" />} />
            <Route path="/project/:id" element={isAuthenticated ? <ProjectDetail /> : <Navigate to="/login" />} />
            
            {/* ANALİTİKA VƏ HESABATLAR */}
            <Route path="/statistics" element={isAuthenticated ? <Statistics /> : <Navigate to="/login" />} />
            <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
            
            {/* 404 YÖNLƏNDİRMƏSİ */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;