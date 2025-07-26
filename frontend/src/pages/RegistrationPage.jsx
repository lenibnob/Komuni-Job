import "../css/Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function RegistrationForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        givenName: '',
        suffix: '',
        middleName: '',
        dob: '',
        surname: '',
        phone: '',
        city: '',
        province: '',
        barangay: '',
        zipcode: '',
        address: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' })); // Clear errors on input
    };

    const handleNext = () => {
        const requiredFields = ['givenName', 'surname', 'dob', 'phone', 'city', 'province', 'barangay', 'zipcode', 'address'];
        const newErrors = {};

        requiredFields.forEach(field => {
            if (!formData[field]?.trim()) {
                newErrors[field] = true;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setStep(2); // move to second step
        }
    };

    const handleSubmit = () => {
        const requiredFields2 = ['email', 'password', 'confirmPassword'];
        const newErrors = {};

        requiredFields2.forEach(field => {
            if (!formData[field]?.trim()) { 
                newErrors[field] = true;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            alert('Form submitted successfully!'); // Replace with actual submit logic
        }
    }

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
                    {step === 1 ? (
                        <div className="signUp">
                            <div className="headerRow">
                                <h1>Sign Up</h1>
                            </div>
                            <hr />

                            <div className="textFields">
                                <div className="textField">
                                    <input
                                        type="text"
                                        name="givenName"
                                        placeholder="Given Name"
                                        value={formData.givenName}
                                        onChange={handleChange}
                                        className={errors.givenName ? "error" : ""}
                                    />
                                </div>
                                <div className="textField">
                                    <input
                                        type="text"
                                        name="suffix"
                                        placeholder="Suffix"
                                        value={formData.suffix}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="textField">
                                    <input
                                        type="text"
                                        name="middleName"
                                        placeholder="Middle Name"
                                        value={formData.middleName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="textField">
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className={errors.dob ? "error" : ""}
                                    />
                                </div>

                                <div className="textField">
                                    <input
                                        type="text"
                                        name="surname"
                                        placeholder="Surname"
                                        value={formData.surname}
                                        onChange={handleChange}
                                        className={errors.surname ? "error" : ""}
                                    />
                                </div>
                                <div className="textField">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone No."
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={errors.phone ? "error" : ""}
                                    />
                                </div>

                                <div className="textField">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="Municipality/City"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={errors.city ? "error" : ""}
                                    />
                                </div>
                                <div className="textField">
                                    <input
                                        type="text"
                                        name="province"
                                        placeholder="Province"
                                        value={formData.province}
                                        onChange={handleChange}
                                        className={errors.province ? "error" : ""}
                                    />
                                </div>

                                <div className="textField">
                                    <input
                                        type="text"
                                        name="barangay"
                                        placeholder="Barangay"
                                        value={formData.barangay}
                                        onChange={handleChange}
                                        className={errors.barangay ? "error" : ""}
                                    />
                                </div>
                                <div className="textField">
                                    <input
                                        type="text"
                                        name="zipcode"
                                        placeholder="Zip Code"
                                        value={formData.zipcode}
                                        onChange={handleChange}
                                        className={errors.zipcode ? "error" : ""}
                                    />
                                </div>
                            </div>

                            <div className="longField">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={errors.address ? "error" : ""}
                                />
                            </div>
                            <div className="buttonRow">
                                <button className="nextButton" onClick={handleNext}>Next</button>   
                            </div>
                        </div>
                    ) : (
                        <div className="accountSetup">
                            <div className="headerRow">
                                <h1>Account Setup</h1>
                            </div>
                            <hr />
                            <div className="accountFields">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? "error" : ""}
                                />
                                <input
                                    type="text"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={errors.password ? "error" : ""}
                                />
                                <input
                                    type="text"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={errors.confirmPassword ? "error" : ""}
                                />
                            </div>

                             <div className="buttonRow">
                                <button className="nextButton" onClick={() => setStep(1)}>Back</button>
                                <button className="nextButton" onClick={handleSubmit}>Next</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
