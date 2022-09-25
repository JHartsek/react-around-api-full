const baseUrl = 'http://localhost:3000';
const headers = {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
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
        headers: headers,
    })
    .then(checkResponse)
}