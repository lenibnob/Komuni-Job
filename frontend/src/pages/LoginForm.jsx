import "../css/Credential.css";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function LoginForm() {

    return (
        <>
            <NavBar />

            <div className="credential-container">
                
                <form className="credential-form">

                    <h1>Sign in</h1>

                    <input id="username" 
                        className="credential-field"
                        type="text"
                        placeholder="Username"
                    
                    />

                    <input id="password" 
                        className="credential-field" 
                        type="text" 
                        placeholder="Password"
                    />

                    <Link className="link-button" to="/login/identify">Forgotten password?</Link>
                    
                    <Link className="link-button" to="/register">Sign up</Link>

                    <button className="submit-button" type="submit">Log in</button>
                </form>
            </div>
        
        </>
    )
}