import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";

import { getDropdownLabel } from "../utils/helpers.js";
const Combobox = ({
  inputValue,
  setInputValue,
  handleInputChange,
  choices,
  setChoices,
  defaultValue,
  onSelect,
  onRemove,
  onChoicesChange,
  resetComboBox,
  label,
  className,
  error,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    onChoicesChange(choices); // Pass choices to parent
  }, [choices, onChoicesChange]);

  useEffect(() => {
    if (resetComboBox) {
      setChoices([]);
      setInputValue("");
    }
  }, [resetComboBox]);

  const handleAddChoice = () => {
    if (error || !inputValue) return; // Prevent adding if there's an error

    if (!choices.includes(inputValue)) {
      const newChoices = [...choices, inputValue];
      setChoices(newChoices);
      setInputValue("");
      onSelect(inputValue);
    }
  };

  const handleRemoveChoice = (choice) => {
    const updatedChoices = choices.filter((c) => c !== choice);
    setChoices(updatedChoices);
    onRemove && onRemove(choice);
  };

  // Close the popup section with the already added options
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * This filtering is usefull if there are lots of options already added.
   * The user can track if they are entering a duplicate on the fly
   */
  const filteredChoices = choices.filter((choice) =>
    choice.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={`${className} relative`} ref={inputRef}>
      <label className="block mb-1 font-semibold flex items-center">
        {label}
        <span className="inline-block ml-2 rounded-full bg-accent-tiel text-white text-xs text-center w-5 h-5 pt-0.5">
          {choices.length}
        </span>
      </label>
      <div
        className="flex items-center border border-gray-300 rounded-md mb-1 cursor-text"
        onClick={() => setIsDropdownOpen(true)}
      >
        {" "}
        <input
          type="text"
          className="flex flex-1 outline-none px-2"
          placeholder="Enter new"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && handleAddChoice()}
        />
        <Button
          onClick={handleAddChoice}
          className="ml-2"
          type="secondary"
          disabled={!!error}
        >
          Add
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {isDropdownOpen && (
        <section className="absolute z-10 w-full bg-white border border-gray-300 rounded-md max-h-48 overflow-y-auto">
          <p className="p-2 bg-secondary font-bold">
            {getDropdownLabel(inputValue, filteredChoices)}
          </p>
          <ul>
            {filteredChoices.map((choice) => (
              <li key={choice} className="p-2 hover:bg-gray-100">
                <div className="flex justify-between items-center">
                  <span className="truncate">{choice}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveChoice(choice);
                    }}
                    className="remove-choice-btn ml-2 text-red-500 cursor-pointer"
                  >
                    &#x2716;
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Combobox;
