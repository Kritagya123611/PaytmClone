import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './index.css';
import App from './App.jsx';
import Login from './login.jsx';
import Register from './Register.jsx';
import Dashboard from './Dashboard.jsx';
import Transaction from './Transaction.jsx';
import History from './History.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/history" element={<History />} />
          </Routes>
      </Router>
    
  </StrictMode>
);

