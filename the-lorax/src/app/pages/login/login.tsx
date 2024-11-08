import { useEffect, useRef, useState } from "react";
import './login.css';
import Header from '../../components/header'
import treeImage from '../../../images/login-tree-image.svg'
import { Formik, Field, Form, ErrorMessage } from "formik";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Send login request to backend
            const response = await fetch("http://localhost:8000/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    username: email,  // Assuming the email is used as the username
                    password: password
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                // Save the token for later use in other API requests
                localStorage.setItem("token", data.access_token);
                const token = localStorage.getItem("token");
                console.log(token)
                alert("Login successful!");
                // Redirect or load other content after login
            } else {
                alert("Login failed! Check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    

    return (
        <div className="login"> 
            <Header/>
            <div className="login-body">
                {/* Left Side with Form */}
                <div className="login-body-left">
                    <h1 className="login-welcome-text">Welcome Back!</h1>
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="login-form-field">
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="login-input" 
                                required 
                            />
                        </div>
                        <div className="login-form-field">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="login-input" 
                                required 
                            />
                        </div>
                        <button type="submit" className="login-button">Sign In</button>
                    </form>
                </div>

                {/* Right Side Image */}
                <div className="login-body-right">
                    <img src={treeImage} alt="Tree Image" className="login-tree-image" />
                </div>
            </div>
        </div>
    )
}
