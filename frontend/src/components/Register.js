import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Register = ({ onRegister, isLoading }) => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = data;
        onRegister(email, password);
        setData({ email: '', password: '' });

    }

    return (
        <div className="login">
            <p className="login__welcome">
                Регистрация
            </p>
            <form onSubmit={handleSubmit} className="login__form">
                <label htmlFor="username"/>
                <input
                    className="login__input"
                    placeholder="Email"
                    required
                    id="email"
                    name="email"
                    type="text"
                    value={data.email}
                    onChange={handleChange}
                />
                <label htmlFor="password"/>
                <input
                    className="login__input"
                    placeholder="Пароль"
                    required
                    id="password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                />
                    <button
                        type="submit"
                        className="login__button">
                        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
            </form>
            <div className="login__signup">
                <p className="login__text">
                    Уже зарегистрированы?&nbsp;
                    <Link
                        to="/sign-in"
                        className="login__link">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register;
