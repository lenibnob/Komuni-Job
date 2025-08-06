import "@/css/AuthCSS/Registration.css";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import TextInput from "@/components/AuthComponents/TextInput";
import SuffixDropdown from "@/components/AuthComponents/SuffixDropdown";
import RadioGroup from "@/components/AuthComponents/RadioGroup";
import { useNavigate } from "react-router-dom";
import { register } from "../../endpoints/api"

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [suffix, setSuffix] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    givenName: '',
    middleName: '',
    surname: '',
    sex: '',
    city: '',
    province: '',
    barangay: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Map frontend fields to backend expected fields
    const backendData = {
      first_name: formData.givenName,
      last_name: formData.surname,
      middle_name: formData.middleName,
      sex: formData.sex,
      municipality: formData.city,
      barangay: formData.barangay,
      province: formData.province,
      address: formData.address,
      phone_number: formData.phone,
      email: formData.email,
      password: formData.password,
      suffix: suffix
    };

    try {
      if(register(backendData)) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert("There is an error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      <NavBar authenticatePage={{ address: "/login", option: "Sign In" }} />
      <div className="registrationPage">
        <div className="registrationContainer">
          <div className="registration">
            <div className="imageContainer"></div>
            <div className="registrationForm">
              <div className="pagination">
                {step > 1 && (
                  <button className="backButton" onClick={() => setStep(step - 1)}>←</button>
                )}
                <h2 className={step === 1 ? 'active' : ''}>1</h2>
                <h2 className={step === 2 ? 'active' : ''}>2</h2>
                <h2 className={step === 3 ? 'active' : ''}>3</h2>
                <h2 className={step === 4 ? 'active' : ''}>4</h2>
              </div>
              <hr />
              <div className="registrationInputField">
                {step === 1 && (
                  <>
                    <TextInput label="Given Name" name="givenName" value={formData.givenName} onChange={handleChange} variant="registration"  />
                    <TextInput label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} variant="registration" />
                    <div className="surnameInputContainer">
                      <TextInput label="Surname" name="surname" value={formData.surname} onChange={handleChange} variant="registration" />
                      <SuffixDropdown onChange={(val) => setSuffix(val)} />
                    </div>
                    <RadioGroup
                      label="Sex"
                      name="sex"
                      options={["Male", "Female"]}
                      selected={formData.sex}
                      onChange={handleChange}
                    />
                    <div className="registrationNextButton">
                      <button onClick={() => setStep(2)}>Next</button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <TextInput label="City" name="city" value={formData.city} onChange={handleChange} variant="registration" />
                    <TextInput label="Province" name="province" value={formData.province} onChange={handleChange} variant="registration" />
                    <TextInput label="Barangay" name="barangay" value={formData.barangay} onChange={handleChange} variant="registration" />
                    <TextInput label="Address" name="address" value={formData.address} onChange={handleChange} variant="registration" />
                    <div className="registrationNextButton">
                      <button onClick={() => setStep(3)}>Next</button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <TextInput label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} type="tel" variant="registration" />
                    <TextInput label="Email" name="email" value={formData.email} onChange={handleChange} type="email" variant="registration" />
                    <TextInput label="Password" name="password" value={formData.password} onChange={handleChange} type="password" variant="registration" />
                    <TextInput label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" variant="registration" />
                    <div className="inputGroup">
                      <label className="termsCheckbox">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                        />
                        I agree to the terms and conditions
                      </label>    
                      {error && <div className="error-message" style={{ color: 'black', margin: '10px 0' }}>{error}</div>}  
                    </div>
                    <div className="registrationNextButton">
                      <button onClick={() => setStep(4)}>Next</button>
                    </div>
                  </>
                )}
                {step === 4 && (
                  <>
                    <div className="inputGroup">
                        <div className="fileSelect" onClick={() => document.getElementById('fileInput').click()}>
                          Click to select file
                          <input
                            id="fileInput"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              console.log('Selected file:', file);
                              // You can store this in state if needed
                            }}
                          />
                        </div>
                        <button className="validateButton">Validate</button>
                    </div>
                    <div className="registrationNextButton">
                      <button onClick={handleRegister}>Register</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}