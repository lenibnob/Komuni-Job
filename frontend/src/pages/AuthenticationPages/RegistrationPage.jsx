// pages/RegistrationForm.jsx
import "@/css/AuthCSS/Registration.css";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import TextInput from "@/components/AuthComponents/TextInput";
import SuffixDropdown from "@/components/AuthComponents/SuffixDropdown";
import RadioGroup from "@/components/AuthComponents/RadioGroup";

export default function RegistrationPage() {
  const [suffix, setSuffix] = useState('');
  const [step, setStep] = useState(1);
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

  const handleRegister = () => {
    if (!formData.agreeToTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    alert("Registration complete!");
  };

  return (
    <>
      <NavBar authenticatePage={{ address: "/login", option: "Log in" }} />
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
              </div>
              <hr />
              <div className="registrationInputField">
                {step === 1 && (
                  <>
                    <TextInput label="Given Name" name="givenName" value={formData.givenName} onChange={handleChange} variant="registration" />
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
