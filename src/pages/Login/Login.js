import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import logoburger from '../../img/logoburger.png';
import { Alert } from 'reactstrap';
import './Login.css';

export const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const routes = useHistory();

    const loungeRoute = () => {
        routes.push('/Lounge')
    }

    const kitchenRoute = () => {
        routes.push('/Kitchen')
    }

    const onSubmit = () => {

        fetch('https://lab-api-bq.herokuapp.com/auth', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${email}&password=${password}`
        })
            .then(result => result.json())
            .then((data) => {
                setEmail('')
                setPassword('')
                localStorage.setItem('token', data.token);
                localStorage.setItem('name', data.name);
                if (data.role === "lounge") {
                    loungeRoute();
                }
                if (data.role === "kitchen") {
                    kitchenRoute();
                }
            })
    }

    return (
        <div className="Login">
            <header>
                <img src={logoburger} className="logoburger-login" alt="logoburger" />
                <h1 className="h1-login">Acesse sua conta</h1>
            </header>
            <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            {errors.email && <Alert color="warning" className="error">{errors.email.message}</Alert>}
                <input
                    type="email"
                    name="email"
                    ref={register({
                        required: 'Digite seu e-mail',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Entre com um e-mail válido',
                        },
                    })}
                    placeholder="E-mail"
                    id="input-login"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                {errors.password && <Alert color="warning" className="error">{errors.password.message}</Alert>}
                <input
                    type="password"
                    name="password"
                    ref={register({ required: "Entre com a sua senha" })}
                    placeholder="Senha"
                    id="input-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit" id="login-btn" onClick={handleSubmit}>Entrar</button>
                <p className="p-login">
                    Não possui cadastro?
                    <Link to='/Register'> Registre-se</Link>
                </p>
            </form>
        </div>
    )
};