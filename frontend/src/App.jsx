import './css/App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/AuthenticationPages/LoginPage";
import RegistrationPage from "./pages/AuthenticationPages/RegistrationPage";
import AboutPage from './pages/AboutPage';

export default function App() {
 
  return (

    <div>

      <main className="main-content">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegistrationPage />} ></Route>
          <Route path="/about" element={<AboutPage />}></Route>
        </Routes>

      </main>
      
      
    </div>

  );
}