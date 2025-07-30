import "../css/Registration.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function TextInput({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="inputGroup">
      <h2>{label}</h2>
      <input
        className="registrationTextInput"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function RadioGroup({ label, name, options, selected, onChange }) {
  return (
    <div className="inputGroup">
      <h2>{label}</h2>
      <div className="registrationCheckboxContainer">
        {options.map((option) => (
          <label className="registrationRadio" key={option}>
            <input
              className="registrationCheckbox"
              type="radio"
              name={name}
              value={option}
              checked={selected === option}
              onChange={onChange}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function RegistrationForm() {
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
      <NavBar authenticate={{address : "/login", option : "Log in"}} />
      <div className="registrationPage">
        <div className="registrationContainer">
          <div className="registration">
            <div className="imageContainer"></div>

            <div className="registrationForm">
              <div className="pagination">
                {step > 1 && (
                  <button className="backButton" onClick={() => setStep(step - 1)}>
                    ←
                  </button>
                )}
                <h2 className={step === 1 ? 'active' : ''}>1</h2>
                <h2 className={step === 2 ? 'active' : ''}>2</h2>
                <h2 className={step === 3 ? 'active' : ''}>3</h2>
              </div>
              <hr />

              <div className="registrationInputField">
                {step === 1 && (
                  <>
                    <TextInput
                      label="Given Name"
                      name="givenName"
                      value={formData.givenName}
                      onChange={handleChange}
                    />
                    <TextInput
                      label="Middle Name"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                    />
                    <TextInput
                      label="Surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                    />
                    <RadioGroup
                      label="Sex"
                      name="sex"
                      options={["Male", "Female"]}
                      selected={formData.sex}
                      onChange={handleChange}
                    />
                    <button onClick={() => setStep(2)}>Next</button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <TextInput
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    <TextInput
                      label="Province"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                    />
                    <TextInput
                      label="Barangay"
                      name="barangay"
                      value={formData.barangay}
                      onChange={handleChange}
                    />
                    <TextInput
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    <div className="buttonGroup">
                      <button onClick={() => setStep(3)}>Next</button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <TextInput
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                    />
                    <TextInput
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                    />
                    <TextInput
                      label="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      type="password"
                    />
                    <TextInput
                      label="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      type="password"
                    />
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
                    <div className="buttonGroup">
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
