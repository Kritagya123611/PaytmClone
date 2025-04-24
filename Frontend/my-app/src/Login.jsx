import './login.css'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.status === 200) {
            toast.success(data.message || "Login successful");
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("phone", data.phone);
            localStorage.setItem("aadhaar", data.aadhaar);
            localStorage.setItem("balance", data.balance);
            navigate("/dashboard");
        } else {
            toast.error(data.alert || "Login failed");
        }
    };

    return (
        <div className='container'>
            <div className="heading">
                Welcome Back!
            </div>
            <div className="subheading">
                Login to your account
            </div>
            <div className="loginform">
                <input
                    type="text"
                    placeholder="Email"
                    className="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="loginbtn" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
