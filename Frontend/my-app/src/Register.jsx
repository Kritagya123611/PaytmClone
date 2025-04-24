import React from "react";
import './Register.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [aadhaar, setAadhaar] = useState("");

    const handleRegister = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phone: Number(phone),
                aadhaar: Number(aadhaar)
            })
        });
        const data = await response.json();
        if (response.status === 201) {
            toast.success(data.message || "Registration successful");
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("phone", data.phone);
            localStorage.setItem("aadhaar", data.aadhaar);
            localStorage.setItem("balance", data.balance);
            navigate("/dashboard");
        } else {
            toast.error(data.alert || "Registration failed");
        }
    }

    return (
        <div className="body">
            <div className="container">
                <div className="heading">Register your account </div>
                <div className="subheading">Create your account</div>
                <div className="form">
                    <input className="name" placeholder="Enter your full name" value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <input className="email" placeholder="Enter your Email address" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input className="password" placeholder="Enter your password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <input className="phone" placeholder="Enter your phone number" value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                    <input className="aadhaar" placeholder="Enter your aadhaar number" value={aadhaar}
                        onChange={(e) => setAadhaar(e.target.value)} />
                    <button className="registerbtn" onClick={handleRegister}>Register</button>
                    <div className="login-link">
                        Already have an account? <a href="/login">Login here</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
