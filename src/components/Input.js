import React from "react";

const Input = ({ id, label, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 font-semibold">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className={`w-full border p-2 rounded ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
