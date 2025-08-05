import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/accounts/'

const LOGIN_URL = `${BASE_URL}login/`

const REGISTER_URL = `${BASE_URL}register/`

export const login = async (data) => {
    const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data) 
    });
    if(response.ok) {
        return true;
    }
    return false;
}

export const register = async (data) => {
    const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
      });
    if(response.ok) {
        return true;
    }
    return false;
}