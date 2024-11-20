import React, { useState, useEffect } from "react";
import './admin.css'
import treeImage from '../../../images/login-tree-image.svg'
import { useNavigate } from "react-router-dom";

interface LoginProps {
    onLogin: () => void; // Callback to trigger after successful login
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                `${process.env.REACT_APP_FASTAPI_URL || ""}token`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({
                        username,
                        password,
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.access_token); 
                onLogin(); 
            } else {
                alert("Login failed!");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred while logging in.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (window.innerWidth <= 768) {
            navigate('/adminMobile')
        }
    })
    

    return (
        <div className="login" >
            <div className="login-body-left">
                <text className="login-welcome-text">
                    Welcome Back!
                </text>
                <form className="login-body-left-form" onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button 
                        className="login-button" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </div>
            <div className="login-body-right">
                <img src={treeImage} alt="tree" className="login-tree-image" />
            </div>
        </div>
    );
};

export default Login;
