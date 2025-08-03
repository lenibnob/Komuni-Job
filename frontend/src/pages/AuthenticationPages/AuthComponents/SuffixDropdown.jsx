import { useState } from "react";

export default function SuffixDropdown({ onChange }) {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const suffixes = ["Jr.", "Sr.", "I.", "II.", "III.", "N/A"];

  const handleSelect = (value) => {
    const finalValue = value === "N/A" ? "" : value;
    setSelected(finalValue);
    setOpen(false);
    if (onChange) onChange(finalValue);
  };

  return (
    <div className="suffix-dropdown-container">
      <div className="suffix-label"><h2>Suffix</h2></div>
      <button className="dropdown-button" onClick={() => setOpen(!open)}>
        {selected || "▼"}
      </button>
      {open && (
        <ul className="dropdown-menu">
          {suffixes.map((suf, i) => (
            <li key={i} onClick={() => handleSelect(suf)}>{suf}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
