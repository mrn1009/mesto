export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(this._checkResponse)
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(this._checkResponse)
    }

    changeUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.nameUser,
          about: data.jobUser
        })
      })
      .then(this._checkResponse)
    }

    changeAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.userAvatar
        })
      })
      .then(this._checkResponse)
    }

    addCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._checkResponse)
    }

    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponse)
    };

    putLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
      .then(this._checkResponse)
    };

    removeLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse)
    };
  }