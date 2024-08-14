import React from "react";

const Checkbox = ({ id, label, checked, onChange }) => {
  return (
    <div className="mb-4 flex">
      <label htmlFor={id} className="block mr-4 font-semibold">
        {label}
      </label>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 mt-1"
      />
    </div>
  );
};

export default Checkbox;
