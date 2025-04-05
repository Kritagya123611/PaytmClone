import React from "react";
import './Dashboard.css';
import { useState } from 'react';   
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Navigate } from "react-router-dom";

export function Dashboard(){
    const navigate=useNavigate();
    const name=localStorage.getItem("name")||"user";
    const email=localStorage.getItem("email");
    const handleLogout = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        toast.success("Logged out successfully");
        navigate("/login");
      };
    return(
        <div>
            <div className="container">
                <div className="heading">Welcome to the Dashboard {name} 👋</div>
                <div className="subheading">Here you can manage your account</div>
                <div className="buttons">
                    <button className="logout" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;