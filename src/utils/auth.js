const baseUrl = 'https://register.nomoreparties.co';
const headers = {
        "Content-Type": "application/json"
    }

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ 
            password: password,
            email: email
        })
    })
        .then(checkResponse)
    } 

export const login = (email, password) => {
    return fetch(`${baseUrl}/signin`,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
    .then(checkResponse)
}

export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET', 
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
    .then(checkResponse)
}