import BASE_URL from './utils';


class Api {
	constructor({ BASE_URL }) {
		this._address = BASE_URL;
		//this._token = token;
	}
// Проверяем на ошибки
	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Error: ${res.status}`);
	}

// метод получения карточек с сервера
	getCards() {
		return fetch(`${this._address}/cards`, {
			method: 'GET',
			headers: {
				//authorization: this._token,
				'Content-Type': 'application/json'
			},
			credentials: 'include',
		})
			.then(this._checkResponse)
	}

	// получение данных профиля с сервера
	getUserInfo() {
		return fetch(`${this._address}/users/me`, {
			method: 'GET',
			headers: {
				//authorization: this._token,
				'Content-Type': 'application/json'
			},
			credentials: 'include',
		}).then(this._checkResponse)
	}

	// редактирование профиля
	editProfile({name, about}) {
		return fetch(`${this._address}/users/me`, {
			method: 'PATCH',
			headers: {
				//authorization: this._token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				about
			}),
			credentials: 'include',
		}).then(this._checkResponse)
	}

	// добавление карточки
	addNewCard({name, link}) {
		return fetch(`${this._address}/cards`, {
			method: 'POST',
			headers: {
				//authorization: this._token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				link
			}),
			credentials: 'include',
		}).then(this._checkResponse)
	}

	// удаление карточки
	deleteCard(id) {
		return fetch(`${this._address}/cards/${id}`, {
			method: 'DELETE',
			headers: {
				//authorization: this._token,
				'Content-Type': 'application/json'
			},
			credentials: 'include',
		}).then(this._checkResponse)
	}

	// добавление лайка / удаление лайка
	changeLikeCardStatus(id, like) {
		return fetch(`${this._address}/cards/likes/${id}`, {
			method: like ? 'PUT' : 'DELETE',
			headers: {
				//authorization: this._token,
				'Content-Type': 'application/json'
			},
			credentials: 'include',
		}).then(this._checkResponse)
	}

	// поменять аватар
	changeUserAvatar({avatar}) {
		return fetch(`${this._address}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				//authorization: this._token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				avatar
			}),
			credentials: 'include',
		})
			.then(this._checkResponse)
	}
}

const api = new Api({ BASE_URL});

export default api;


