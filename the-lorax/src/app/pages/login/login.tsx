import { useEffect, useRef, useState } from "react";
import './login.css';
import Header from '../../components/header'
import treeImage from '../../../images/login-tree-image.svg'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login">
            <Header/>
            <div className="login-body">
                <div className="login-body-left">
                    <text>Welcome Back!</text>
                    <div className="login-component">

                    </div>
                </div>
                <img src={treeImage} alt="Tree Image" className="login-tree-image"></img>
            </div>
        </div>
    )
}
