export default function RadioGroup({ label, name, options, selected, onChange }) {
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
