class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _sendRequest(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  loadUserInfo() {
    return this._sendRequest(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
  }

  getInitialCards() {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  editProfile(name, about) {
    return this._sendRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
  }

  updateAvatar(link) {
    return this._sendRequest(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
  }

  addPost(name, link) {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
  }

  deletePost(cardId) {
    return this._sendRequest(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers, 
    })
  }

  addLike(cardId) {
    return this._sendRequest(`${this._baseUrl}/cards/${cardId}/likes/`, {
      method: "PUT",
      headers: this._headers,
    })
  }

  removeLike(cardId) {
    return this._sendRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  getInitialData() {
    return Promise.all([this.loadUserInfo(), this.getInitialCards()]);
  }
}

const apiOptions = {
  baseUrl: "https://api.around-the-us-hartsek.students.nomoredomainssbs.ru",
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`
}
};

const api = new Api(apiOptions);

export default api; 