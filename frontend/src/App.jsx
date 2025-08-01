import './css/App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

export default function App() {
 
  return (

    <div>

      <main className="main-content">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegistrationPage />} ></Route>
        </Routes>

      </main>
      
      
    </div>

  );
}