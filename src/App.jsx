import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherDashboard from './components/WeatherDashboard';
import { RegisterPage } from './components/RegisterPage';
import 'rsuite/dist/rsuite.min.css';
import UserPublic from './ProtectedRoute/publicRoute';
import UserProtect from './ProtectedRoute/privateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPublic><RegisterPage /></UserPublic>} />
        <Route path="/weather" element={<UserProtect><WeatherDashboard /></UserProtect>} />
      </Routes>
    </Router>
  );
}

export default App;
