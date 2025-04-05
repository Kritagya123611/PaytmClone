import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate=useNavigate();
  return (
    <div className="container">
      <div className="heading">Welcome to the new way of payments</div>
      <div className="buttons">
        <button className="register" onClick={()=>navigate("/Register")}>Register</button>
        <button className="login" onClick={()=>navigate("/login")}>Login</button>
      </div>
    </div>
  );
}

export default App;
