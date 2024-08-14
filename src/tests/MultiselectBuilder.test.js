import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import MultiselectBuilder from "../components/MultiselectBuilder";
import { submitForm } from "../reducers/multiselectBuilderSlice";
import { validateField, validateForm } from "../utils/helpers";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../utils/helpers", () => ({
  validateField: jest.fn(),
  validateForm: jest.fn(),
}));

jest.mock("../reducers/multiselectBuilderSlice", () => ({
  submitForm: jest.fn(),
}));

describe("MultiselectBuilder", () => {
  const dispatchMock = jest.fn();
  const stateMock = { status: "idle" };
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue(stateMock);
  });

  it("does not submit the form when invalid", () => {
    validateForm.mockReturnValue(false);

    render(<MultiselectBuilder formHeading="Test Form" />);
    const submitButton = screen.getByText("Submit Form");
    fireEvent.click(submitButton);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it("renders without crashing", () => {
    render(<MultiselectBuilder formHeading="Test Form" />);
    expect(screen.getByText("Test Form")).toBeInTheDocument();
  });

  it("handles label input change and validation", () => {
    validateField.mockReturnValue("Label is required.");
    render(<MultiselectBuilder formHeading="Test Form" />);
    const labelInput = screen.getByLabelText("Label");
    fireEvent.change(labelInput, { target: { value: "asd" } });
    expect(validateField).toHaveBeenCalledWith(
      "label",
      "asd",
      expect.anything()
    );
    fireEvent.change(labelInput, { target: { value: "" } });
    expect(validateField).toHaveBeenCalledWith("label", "", expect.anything());
    expect(screen.getByText("Label is required.")).toBeInTheDocument();
  });

  it("handles defaultValue input change and validation", () => {
    validateField.mockReturnValue("");
    render(<MultiselectBuilder formHeading="Test Form" />);
    const defaultValueInput = screen.getByLabelText("Default Value");
    fireEvent.change(defaultValueInput, { target: { value: "" } });
    expect(validateField).toHaveBeenCalledWith(
      "defaultValue",
      "",
      expect.anything()
    );
  });
  it("handles combobox input change and validation", () => {
    render(<MultiselectBuilder formHeading="Test Form" />);
    const comboboxInput = screen.getByPlaceholderText("Enter new");
    fireEvent.change(comboboxInput, { target: { value: "Test" } });
    expect(validateField).toHaveBeenCalledWith(
      "combobox",
      "Test",
      expect.anything(),
      []
    );
  });

  it("submits the form when valid", () => {
    // Mocking validateForm to return true, indicating the form is valid
    validateForm.mockReturnValue(true);

    // Render the component
    render(<MultiselectBuilder formHeading="Test Form" />);

    // Find the submit button and click it
    const submitButton = screen.getByText("Submit Form");
    fireEvent.click(submitButton);

    // Expect dispatch to have been called with submitForm
    expect(dispatchMock).toHaveBeenCalledWith(submitForm(expect.anything()));

    // Optional: verify the exact form data being dispatched
    expect(submitForm).toHaveBeenCalledWith({
      label: "",
      isMultiselect: false,
      isRequired: false,
      defaultValue: "",
      comboBoxChoices: [],
      shouldDisplayAlpha: false,
    });
  });

  it("clears the form when clear button is clicked", () => {
    render(<MultiselectBuilder formHeading="Test Form" />);
    const clearButton = screen.getByText("Clear Form");
    fireEvent.click(clearButton);
    expect(screen.getByLabelText("Label").value).toBe("");
  });
});
