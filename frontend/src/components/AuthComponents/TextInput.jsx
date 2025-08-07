export default function TextInput({ label, name, value, onChange, type = "text", variant = "login" }) {
  const isSurname = name === "surname";
  const baseClass = variant === "registration" ? "registrationTextInput" : "loginTextInput";

  return (
    <div className="inputGroup">
      <h2>{label}</h2>
      <input
        className={`${baseClass} ${isSurname ? "surnameInput" : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
}
