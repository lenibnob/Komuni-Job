import "../css/NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="navBar">

            <div className="navBarBrand">
                <div className="logoIcon"></div>
                <Link className="navBarTitle" to="/">komuniJOB</Link>
            </div>

            <div className="navBarLinks">
                <Link className="navLink" to="/" >About Us</Link>
                <Link className="navLink" to="/favorites" >Contact</Link>
                <Link to="/register"><button className="navButton">Sign up</button></Link>
            </div>
            
        </nav>
    )
}