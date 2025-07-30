import "../css/Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function TextInput({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="inputGroup">
      <h2>{label}</h2>
      <input
        className="loginTextInput"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in both email and password.");
      return;
    }
    alert("Logging in...");
    // Add login logic here (e.g., API call)
  };

  return (
    <>
      <NavBar authenticate={{address : "/register", option : "Sign up"}}/>
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
              />
              <TextInput
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
              />
              <p>
                Don't have an account?{" "}
                <Link to="/register">Register here</Link>
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
