import React from 'react';
import { Link } from 'react-router-dom';

export const Login = () => (
    <div>
        <header>
            <h1>Login</h1>
        </header>
        <p>
            <Link to='/register'>Ir para a página de Cadastro</Link>
        </p>
    </div>
);