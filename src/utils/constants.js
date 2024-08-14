export const multiselectFormValidationSchema = {
  label: {
    required: "Label is required",
    maxLength: (value) =>
      value.length > 40 ? `Label must be maximum ${40} characters.` : "",
  },
  defaultValue: {
    required: "Default Value is required",
  },
  combobox: {
    customValidation: (value, choices) => {
      if (value.length > 40) {
        return `Option must be maximum ${40} characters.`;
      } else if (choices.length >= 50 && value.length) {
        return `Cannot add more than ${50} options.`;
      } else if (choices.includes(value)) {
        return "Option already exists.";
      } else {
        return ""; // Clear error if validation passes
      }
    },
  },
  // Add more fields with their respective validation rules here if needed
};
