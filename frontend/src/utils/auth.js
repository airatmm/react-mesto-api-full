//import {setToken} from "./token";
import BASE_URL from './utils';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({email, password}),
    })
        .then(checkResponse);
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({email, password}),
    })
        .then(checkResponse)
        // .then((data) => {
        //     if (data.token) {
        //         //localStorage.setItem('jwt', data.token);
        //         return data;
        //     }
        // })
};

export const signout = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: 'include',
    }).then(checkResponse);
};

export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: 'include',
    })
        .then(checkResponse);
};

//Bearer - предоставить доступ носителю этого токена
