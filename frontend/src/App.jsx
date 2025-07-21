import './css/App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import LoginForm from "./pages/LoginForm";
import RegistrationForm from "./pages/RegistrationForm";

export default function App() {
 
  return (

    <div>

      <main className="main-content">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/register" element={<RegistrationForm />} ></Route>
        </Routes>

      </main>
      
      
    </div>

  );
}
