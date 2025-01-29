import React, { useState } from 'react';
import './css/register.css';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/RegisterSlice';


const Register = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ username, email, password }));
        console.log('User registered:', { username, email, password });
    }

    return (
        <div className="register-container">
            <h2>Register to Y</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
<div className="register-container">
    <h2>Register</h2>
    <form>
        <div>
            <label>Username:</label>
            <input type="text" required />
        </div>
        <div>
            <label>Email:</label>
            <input type="email" required />
        </div>
        <div>
            <label>Password:</label>
            <input type="password" required />
        </div>
        <button type="submit">Register</button>
    </form>
</div>