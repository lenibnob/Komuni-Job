import "../css/Register.css";
import { Link } from "react-router-dom";
export default function RegistrationForm() {

    return (
        <>
            <div className="registerPageContainer">
                <nav className="navBarContainer">
                    <div className="navBar">
                        <Link className="titleLink" to="/">
                            <h1 className="logo">KJ</h1>
                            <h1 className="title">KomuniJOB</h1>
                        </Link>
                    </div>

                    <div className="links">
                        <Link className="navLink">About Us</Link>
                        <Link className="navLink">Contact</Link>
                        <Link className="navLinkButton">Sign up</Link>
                    </div>
                </nav>

                <div className="registerPage">
                    <div className="signUp">
                        <div className="headerRow">
                            <h1>Sign up</h1>
                        </div>
                        <hr />

                        <div className="textFields">
                            <div className="textField">
                                <input type="text" name="givenName" placeholder="Given Name" />
                            </div>
                            <div className="textField">
                                <input type="text" name="suffix" placeholder="Suffix" />
                            </div>

                            <div className="textField">
                                <input type="text" name="middleName" placeholder="Middle Name" />
                            </div>
                            <div className="textField">
                                <input type="date" name="dob" />
                            </div>

                            <div className="textField">
                                <input type="text" name="surname" placeholder="Surname" />
                            </div>
                            <div className="textField">
                                <input type="tel" name="phone" placeholder="Phone No." />
                            </div>

                            <div className="textField">
                                <input type="text" name="city" placeholder="Municipality/City" />
                            </div>
                            <div className="textField">
                                <input type="text" name="province" placeholder="Province" />
                            </div>

                            <div className="textField">
                                <input type="text" name="barangay" placeholder="Barangay" />
                            </div>
                            <div className="textField">
                                <input type="text" name="zipcode" placeholder="Zip Code" />
                            </div>
                        </div>

                        <div className="longField">
                            <input type="text" name="address" placeholder="Address" />
                        </div>

                        <button className="nextButton">Next</button>
                    </div>
                </div>
            </div>
        </>
    )
}