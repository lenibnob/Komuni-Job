// pages/LoginForm.jsx
import "@/css/AuthCSS/Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import TextInput from "@/components/AuthComponents/TextInput";
import { login } from '../../endpoints/api'


export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const handleLogin = async (e) => {
    if (!formData.email || !formData.password) {
      alert("Please fill in both email and password.");
      return;
    }
    else {
      if(login(formData)) {
        alert("Log in successful");
        navigate("/dashboard");
      }
      else alert("There is an error");
    }
  };

  return (
    <>
      <NavBar authenticatePage={{ address: "/register", option: "Sign Up" }} />
      <div className="loginPage">
        <div className="loginContainer">
          <div className="login">
            <div className="imageContainer">
             <div className="orangeOverlay"></div>
            </div>
            <div className="loginForm">
              <hr />
              <TextInput
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                variant="login"
              />
              <TextInput
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                variant="login"
              />
              <p>
                Don't have an account? <Link to="/register">Sign up</Link>
              </p>
              <div className="buttonGroup">
                <button onClick={handleLogin}>Log In</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
