import "../css/Credential.css";
import NavBar from "../components/Navbar";
export default function RegistrationForm() {

    return (
        <>
            <NavBar />

            <div className="credential-container">
                
                <form className="credential-form">

                    <h1>Sign up</h1>

                    <input id="username" 
                        className="credential-field"
                        type="text"
                        placeholder="Username"
                    
                    />

                    <input id="email" 
                        className="credential-field" 
                        type="text" 
                        placeholder="Email address"
                    />

                    <input id="password" 
                        className="credential-field" 
                        type="text" 
                        placeholder="New password"
                    />

                    <input id="confirmPassword" 
                        className="credential-field" 
                        type="text" 
                        placeholder="Confirm password"
                    />
                    
                    <button className="submit-button" type="submit">Log in</button>
                </form>
            </div>
        
        </>
    )
}