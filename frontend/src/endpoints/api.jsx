import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/'

const LOGIN_URL = `${BASE_URL}api/accounts/login/`

const REGISTER_URL = `${BASE_URL}api/accounts/register/`

const LOGOUT_URL = `${BASE_URL}api/accounts/logout/`

const UPLOAD_URL = `${BASE_URL}api/accounts/register/upload-id/`

const VERIFY_URL =  `${BASE_URL}id-verify/id-ocr/`

export const login = async (data) => {
  try{
    const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data) 
    });
    const res = await response.json();

    if(response.ok) {
      return res.success;
    }
  }
  catch(error) {
    alert("An error has occured");
    return false;
  }
}

export const register = async (data) => {
  try{
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
  catch(error) {
    alert("An error has occured");
    return false;
  }
}

export const logout = async () => {
  try{
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
  catch(error) {
    alert("An error has occured");
    return false;
  }
}

export const uploadId = async () => {
  try{
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
  catch(error) {
    alert("An error has occured");
    return false;
  }
}

export const confirmId = async (firstName, middleName, lastName, suffix, personId, personFace) => {
  
  const formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("middle_name", middleName);
  formData.append("last_name", lastName);
  formData.append("suffix", suffix);
  formData.append("id_image", personId);
  formData.append("face_image", personFace);
  
  try{
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body: formData
    });
    const data = await response.json();

    return !!data.match;
  }
  catch(error){
    console.error("Error at: ", error);
    return false;
  }
}

export const getDataDashboard = async () => {
  
  const formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("middle_name", middleName);
  formData.append("last_name", lastName);
  formData.append("suffix", suffix);
  formData.append("id_image", personId);
  formData.append("face_image", personFace);
  
  try{
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body: formData
    });
    const data = await response.json();

    return !!data.match;
  }
  catch(error){
    console.error("Error at: ", error);
    return false;
  }
}

