import axios from 'axios'

export const BASE_URL = 'http://localhost:8000/'

const LOGIN_URL = `${BASE_URL}api/accounts/login/`

const REGISTER_URL = `${BASE_URL}api/accounts/register/`

const LOGOUT_URL = `${BASE_URL}api/accounts/logout/`

const UPLOAD_URL = `${BASE_URL}api/accounts/register/upload-id/`

const VERIFY_URL =  `${BASE_URL}id-verify/id-ocr/`

const CSRF_URL = `${BASE_URL}api/accounts/csrf/`

const POST_URL = `${BASE_URL}api/jobs/`

export function goToJob(id) {
  return POST_URL + id + '/';
}

export function getJobUrl() {
  return localStorage.getItem("view_job_url");
}

export function setViewJobUrl(url) {
  localStorage.setItem("view_job_url", url);
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const login = async (data) => {
  try{
    const response = await fetch(LOGIN_URL, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data) 
    });
    const res = await response.json();
    if(response.ok) {
      return res.success;
    } 
    return res.success;
  }
  catch(error) {
    alert("An error has occured");
    console.error(`${error}`);
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

export const postJob = async (data) => {
  const csrf = await getCookie("csrftoken");
  try{
    const response = await fetch(POST_URL, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'X-CSRFToken': csrf 
        },
        credentials: 'include',
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

