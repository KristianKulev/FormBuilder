import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Combobox from "../components/Combobox";

describe("Combobox", () => {
  let baseProps;

  beforeEach(() => {
    baseProps = {
      inputValue: "",
      setInputValue: jest.fn(),
      handleInputChange: jest.fn(),
      choices: [],
      setChoices: jest.fn(),
      defaultValue: "",
      onSelect: jest.fn(),
      onChoicesChange: jest.fn(),
      resetComboBox: false,
      label: "Test Label",
      className: "test-class",
      error: "",
    };
  });

  it("renders without crashing", () => {
    render(<Combobox {...baseProps} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("calls handleInputChange when input value changes", () => {
    render(<Combobox {...baseProps} />);
    const input = screen.getByPlaceholderText("Enter new");
    fireEvent.change(input, { target: { value: "Test" } });
    expect(baseProps.handleInputChange).toHaveBeenCalledWith(expect.anything());
  });

  it("adds a choice when Add button is clicked", () => {
    render(
      <Combobox {...baseProps} inputValue="New Choice" choices={["Choice 1"]} />
    );
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);
    expect(baseProps.setChoices).toHaveBeenCalledWith([
      "Choice 1",
      "New Choice",
    ]);
  });

  it("does not add a choice if there's an error", () => {
    render(
      <Combobox
        {...baseProps}
        inputValue="New Choice"
        choices={["Choice 1"]}
        error="ERROR"
      />
    );
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    expect(baseProps.setChoices).not.toHaveBeenCalled();
  });

  it("removes a choice when remove button is clicked", () => {
    render(
      <Combobox
        {...baseProps}
        inputValue=""
        choices={["Choice 1", "Choice 2"]}
      />
    );
    const input = screen.getByPlaceholderText("Enter new");
    fireEvent.focus(input);
    const removeButton = screen.getAllByText("✖")[0];
    fireEvent.click(removeButton);
    expect(baseProps.setChoices).toHaveBeenCalledWith(["Choice 2"]);
  });

  it("opens dropdown when input is focused", () => {
    render(<Combobox {...baseProps} />);
    const input = screen.getByPlaceholderText("Enter new");
    fireEvent.focus(input);
    expect(screen.getByText("No current choices")).toBeInTheDocument();
  });

  it("closes dropdown when clicking outside", () => {
    const { container } = render(<Combobox {...baseProps} />);
    const input = screen.getByPlaceholderText("Enter new");
    fireEvent.focus(input);
    fireEvent.mouseDown(container);
    expect(screen.queryByText("No current choices")).not.toBeInTheDocument();
  });

  it("calls onSelect when a choice is added", () => {
    render(
      <Combobox {...baseProps} inputValue="New Choice" choices={["Choice 1"]} />
    );
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);
    expect(baseProps.onSelect).toHaveBeenCalledWith("New Choice");
  });
});
