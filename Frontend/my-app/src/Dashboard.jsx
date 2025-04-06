import React, { useEffect } from "react";
import './Dashboard.css';
import { useState } from 'react';   
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Navigate } from "react-router-dom";

export function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        aadhaar: "",
        balance: ""
    });

    useEffect(() => {
        setUser({
            name: localStorage.getItem("name") || "User",
            email: localStorage.getItem("email") || "",
            phone: localStorage.getItem("phone") || "",
            aadhaar: localStorage.getItem("aadhaar") || "",
            balance: localStorage.getItem("balance") || "5000"
        });
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <div className="container">
            <div className="heading">Welcome to the Dashboard, {user.name} 👋</div>
            <div className="subheading">Here you can manage your account</div>
            
            <div className="content">
                <div className="userInfo">
                    <h3>Your Credentials:</h3>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Aadhaar:</strong> {user.aadhaar}</p>
                    <p><strong>Balance:</strong> ₹{user.balance}</p>
                </div>

                <div className="buttons">
                    <button className="logout" onClick={handleLogout}>Logout</button>
                    <button className="transactions" onClick={()=>{navigate("/transaction")}}>Make Transactions</button>
                    <button className="history" onClick={()=>{navigate("/history")}}>See Transaction History</button>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;