import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/'

const LOGIN_URL = `${BASE_URL}api/accounts/login/`

const REGISTER_URL = `${BASE_URL}api/accounts/register/`

const LOGOUT_URL = `${BASE_URL}api/accounts/logout/`

const UPLOAD_URL = `${BASE_URL}api/accounts/register/upload-id/`

const VERIFY_URL =  `${BASE_URL}id-verify/id-ocr/`
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

export const logout = async () => {
    const response = await fetch(LOGOUT_URL, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        credentials: "include"
      });
    if(response.ok) {
        return true;
    }
    return false;
}

export const uploadId = async () => {
    const response = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        credentials: "include"
      });
    if(response.ok) {
        return true;
    }
    return false;
}

export const confirmId = async (fullName, personId) => {
  
  const formData = new FormData();
  formData.append("full_name", fullName);
  formData.append("id_image", personId);
  try{
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body: formData
    });
    const data = await response.json();

    if(response.ok) {
      return !!data.match
    }
    return false;
  }
  catch(error){
    console.error("Error at: ", error);
    return false;
  }
  
  
}