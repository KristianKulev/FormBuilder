// Used inside the combobox to show relevant label when items are filtered
export const getDropdownLabel = (inputValue, filteredChoices) => {
  let text = "Current choices";

  if (inputValue) {
    if (filteredChoices.length) {
      text = "Similar choices";
    }

    if (!filteredChoices.length) {
      text = "Add as new";
    }
  } else if (!inputValue && !filteredChoices.length) {
    text = "No current choices";
  }

  return text;
};

// Main method used to validate inputs
export const validateField = (
  field,
  value,
  validationSchema,
  secondaryValue = []
) => {
  const rules = validationSchema[field];
  if (!rules) return ""; // No validation rules defined for the field

  let error = "";

  if (rules.required && !value) {
    error = rules.required;
  }

  if (!error && rules.maxLength) {
    error = rules.maxLength(value);
  }

  if (!error && rules.customValidation) {
    error = rules.customValidation(value, secondaryValue);
  }

  // Add different validation types here if needed
  return error;
};

// Main method used to validate forms
export const validateForm = ({
  validationSchema,
  stateValues,
  validateField,
  setErrors,
}) => {
  const newErrors = {};

  Object.keys(validationSchema).forEach((field) => {
    const value = stateValues[field];

    const error = validateField(field, value, validationSchema);
    if (error) {
      newErrors[field] = error;
    }
  });

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
