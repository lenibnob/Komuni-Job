// pages/LoginForm.jsx
import "@/css/AuthCSS/Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import TextInput from "@/components/AuthComponents/TextInput";

export default function LoginPage() {
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
      const response = await fetch("http://127.0.0.1:8000/api/register/", {

      })
    }
  };

  return (
    <>
      <NavBar authenticatePage={{ address: "/register", option: "Sign up" }} />
      <div className="loginPage">
        <div className="loginContainer">
          <div className="login">
            <div className="imageContainer"></div>
            <div className="loginForm">
              <h1>Login</h1>
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
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
              <div className="buttonGroup">
                <button onClick={handleLogin}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
