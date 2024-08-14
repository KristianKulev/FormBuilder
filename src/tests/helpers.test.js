import {
  getDropdownLabel,
  validateField,
  validateForm,
} from "../utils/helpers";

describe("getDropdownLabel", () => {
  it('should return "Current choices" when inputValue is empty and filteredChoices are not empty', () => {
    expect(getDropdownLabel("", ["choice1"])).toBe("Current choices");
  });

  it('should return "No current choices" when inputValue is empty and filteredChoices are empty', () => {
    expect(getDropdownLabel("", [])).toBe("No current choices");
  });

  it('should return "Similar choices" when inputValue is not empty and filteredChoices are not empty', () => {
    expect(getDropdownLabel("choice", ["choice1"])).toBe("Similar choices");
  });

  it('should return "Add as new" when inputValue is not empty and filteredChoices are empty', () => {
    expect(getDropdownLabel("newChoice", [])).toBe("Add as new");
  });
});

describe("validateField", () => {
  const validationSchema = {
    label: {
      required: "Label is required.",
      maxLength: (value) =>
        value.length > 10 ? "Label must be less than 10 characters." : "",
      customValidation: (value, secondaryValue) =>
        secondaryValue.includes(value) ? "Duplicate value." : "",
    },
  };

  it("should return if not field is not found", () => {
    expect(validateField("test", "", validationSchema)).toBe("");
  });

  it("should return required error when value is empty", () => {
    expect(validateField("label", "", validationSchema)).toBe(
      "Label is required."
    );
  });

  it("should return maxLength error when value exceeds maxLength", () => {
    expect(
      validateField("label", "this is a long label", validationSchema)
    ).toBe("Label must be less than 10 characters.");
  });

  it("should return custom validation error when custom condition fails", () => {
    expect(
      validateField("label", "duplicate", validationSchema, ["duplicate"])
    ).toBe("Duplicate value.");
  });

  it("should return no error when value is valid", () => {
    expect(
      validateField("label", "valid", validationSchema, ["anotherValue"])
    ).toBe("");
  });
});
describe("validateForm", () => {
  const validationSchema = {
    label: {
      required: "Label is required.",
      maxLength: (value) =>
        value.length > 10 ? "Label must be less than 10 characters." : "",
    },
    defaultValue: {
      required: "Default Value is required.",
    },
  };

  let setErrors;

  beforeEach(() => {
    setErrors = jest.fn();
  });

  it("should return false and set errors if any field is invalid", () => {
    const stateValues = {
      label: "this is a long label",
      defaultValue: "",
    };

    const result = validateForm({
      validationSchema,
      stateValues,
      validateField,
      setErrors,
    });

    expect(result).toBe(false);
    expect(setErrors).toHaveBeenCalledWith({
      label: "Label must be less than 10 characters.",
      defaultValue: "Default Value is required.",
    });
  });

  it("should return true and set no errors if all fields are valid", () => {
    const stateValues = {
      label: "valid",
      defaultValue: "some value",
    };

    const result = validateForm({
      validationSchema,
      stateValues,
      validateField,
      setErrors,
    });

    expect(result).toBe(true);
    expect(setErrors).toHaveBeenCalledWith({});
  });
});
