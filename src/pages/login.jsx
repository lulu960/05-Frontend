import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './css/login.css';
import { login } from '../redux/slices/AuthSlice';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await dispatch(login({ email, password })).unwrap();
            const token = response.token; // Adjust this line based on the actual response structure
            const username = response.user.username; // Adjust this line based on the actual response structure
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Log in to Y</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input 
                            type="email" 
                            placeholder="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="login-button">Log in</button>
                </form>
                <div className="login-footer">
                    <a href="#">Forgot password ?</a>
                    <span>·</span>
                    <a href="#">Sign up for Y</a>
                </div>
            </div>
        </div>
    );
};

export default Login;