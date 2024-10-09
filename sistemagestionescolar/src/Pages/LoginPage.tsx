import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Asegúrate de que este archivo CSS esté en la misma carpeta

interface LoginPageProps {
    setToken: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://localhost:7224/api/Auth/login', {
                email,
                password
            },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const token = response.data.token;
            setToken(token);
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } catch (err) {
            setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            console.error('Error de login:', err);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Iniciar sesión</h2>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="submit-button">
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default LoginPage;