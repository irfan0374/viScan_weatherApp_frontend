import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherDashboard from './components/WeatherDashboard'
import { RegisterPage } from './components/RegisterPage';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <Router>
       <ToastContainer/>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path='/weather' element={<WeatherDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
