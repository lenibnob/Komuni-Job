import "../css/NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar({authenticate}) {
    return (
        <nav className="navBar">

            <div className="navBarBrand">
                <div className="logoIcon"></div>
                <Link className="navBarTitle" to="/">komuniJOB</Link>
            </div>

            <div className="navBarLinks">
                <Link className="navLink" to="/about" >About Us</Link>
                <Link className="navLink" to="/about" >Contact</Link>
                <Link to={authenticate.address}><button className="navButton">{authenticate.option}</button></Link>
            </div>
            
        </nav>
    )
}