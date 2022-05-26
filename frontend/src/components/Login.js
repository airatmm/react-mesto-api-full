import React, {useState} from 'react';

const Login = ({onLogin, isLoading}) => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.email || !data.password) {
            console.log(data.email)
            console.log(data.password)
            return;
        }
        const {email, password} = data;
        onLogin(email, password);
    }

    return (
        <div onSubmit={handleSubmit} className="login">
            <p className="login__welcome">
                Вход
            </p>
            <form className="login__form">
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
                    {isLoading ? 'Вход...' : 'Войти'}
                </button>
            </form>
        </div>
    )
}

export default Login;