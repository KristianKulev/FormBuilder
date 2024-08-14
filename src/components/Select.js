import React from "react";

const Select = ({ id, label, value, onChange, options, error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 font-semibold">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full border p-2 rounded ${error ? "border-red-500" : ""}`}
      >
        <option value="">Select a {label.toLowerCase()}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
