import { Link } from "react-router-dom";
import "../css/NavBar.css";

export default function NavBar() {
    return (
        <nav className="navbar">

            <div className="navbar-brand">
                <Link className="nav-link" to="/">|komuniJOB</Link>
            </div>

            <div className="navbar-links">
                <Link className="nav-link" to="/" >About Us</Link>
                <Link className="nav-link" to="/favorites" >Contact</Link>
                <Link to="/register"><button className="navButton">Sign up</button></Link>
            </div>
            
        </nav>
    )
}