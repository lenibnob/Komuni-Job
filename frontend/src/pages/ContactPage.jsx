import "@/css/Contact.css";
import NavBar from "../components/NavBar"

export default function ContactPage() {
    return (
        <div className="contactPage">
            <NavBar authenticatePage={{address : "/register", option : "Sign up"}} />
            <div className="contactHeader">
                <h1>Contact Us</h1>
                <h2>To learn more about KomuniJOB, please fill out the contact form
                    and a member of the team will be in touch soon
                </h2>
            </div>
            <div className="contactFormContainer">
                <div className="contactForm">

                    <div className="inputName">
                        <div className="inputNameField">
                            <h2>Given Name</h2>
                            <input type="text" name="givenName" />
                        </div>
                        <div className="inputNameField">
                            <h2>Surname</h2>
                            <input type="text" name="surname" />
                        </div>
                    </div>

                    <div className="inputEmail">
                        <h2>Email</h2>
                        <input type="text" name="email"/>
                    </div>

                    <div className="contactText">
                        <h2>How can we help?</h2>
                        <textarea name="helpText" id="helpTextID"></textarea>
                    </div>

                    <div className="contactButton">
                        <button>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}