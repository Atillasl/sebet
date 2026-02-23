import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import WarehouseDetail from './pages/WarehouseDetail';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Statistics from './pages/Statistics';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // Bu funksiya Header-dəki çıxış düyməsi üçün lazımdır
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* BURA DİQQƏT: 
        'bg-gray-50 dark:bg-gray-950' klassı bütün tətbiqin fonunu idarə edir.
        'transition-colors' isə Dark Mode-a keçəndə rəngin yumşaq dəyişməsini təmin edir.
      */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        
        {/* Giriş edilibsə Header görünsün və logout funksiyasını ötürək */}
        {isAuthenticated && <Header onLogout={handleLogout} />}

        <main>
          <Routes>
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} 
            />
            
            {/* Qorunan Marşrutlar (Protected Routes) */}
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/statistics" element={isAuthenticated ? <Statistics /> : <Navigate to="/login" />} />
            <Route path="/warehouse/:id" element={isAuthenticated ? <WarehouseDetail /> : <Navigate to="/login" />} />
            <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
            
            {/* Yanlış URL-lər üçün yönləndirmə */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;