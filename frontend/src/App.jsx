import './css/App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/AuthenticationPages/LoginPage";
import RegistrationPage from "./pages/AuthenticationPages/RegistrationPage";
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ViewJob from './pages/Dashboard/ViewJobPage';

export default function App() {
 
  return (

    <div>

      <main className="main-content">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/dashboard/viewjob' element={<ViewJob />} />
        </Routes>

      </main>
      
      
    </div>

  );
}