import React from "react";

import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import Select from "./Select";
import Combobox from "./Combobox";

const MultiselectBuilderForm = ({
  formHeading,
  status,
  label,
  isMultiselect,
  setIsMultiselect,
  isRequired,
  setIsRequired,
  defaultValue,
  setDefaultValue,
  comboboxInputValue,
  setComboboxInputValue,
  handleComboboxInputChange,
  comboBoxChoices,
  setComboBoxChoices,
  shouldDisplayAlpha,
  setShouldDisplayAlpha,
  errors,
  setError,
  handleClearForm,
  handleLabelChange,
  handleDefaultValueChange,
  handleSubmit,
}) => {
  return (
    <div className="px-6 py-8 max-w-md mx-auto border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">{formHeading}</h2>
      <Input
        id="filedLabel"
        label="Label"
        value={label}
        onChange={handleLabelChange}
        error={errors?.label}
        className="mb-2"
      />
      <Checkbox
        if="isMultiselect"
        label="Is Multiselect"
        checked={isMultiselect}
        className="mb-2"
        onChange={(e) => setIsMultiselect(e.target.checked)}
      />
      <Checkbox
        if="isRequired"
        label="Is Required"
        checked={isRequired}
        className="mb-2"
        onChange={(e) => setIsRequired(e.target.checked)}
      />
      <Combobox
        label="Add choices"
        defaultValue={defaultValue}
        onSelect={(value) => {
          !defaultValue && setDefaultValue(value);
          if (value) setError("defaultValue", "");
        }}
        onRemove={(removedValue) =>
          removedValue === defaultValue && setDefaultValue("")
        }
        onChoicesChange={setComboBoxChoices}
        resetComboBox={comboBoxChoices?.length === 0}
        choices={comboBoxChoices}
        setChoices={setComboBoxChoices}
        inputValue={comboboxInputValue}
        setInputValue={setComboboxInputValue}
        handleInputChange={handleComboboxInputChange}
        error={errors?.combobox}
        className="mb-4"
      />
      <Select
        id="defaultValue"
        label="Default Value"
        value={defaultValue}
        onChange={handleDefaultValueChange}
        options={comboBoxChoices}
        error={errors?.defaultValue}
        className="mb-4"
      />
      <Checkbox
        id="isAlpha"
        label="Is Alphabetical"
        checked={shouldDisplayAlpha}
        onChange={(e) => setShouldDisplayAlpha(e.target.checked)}
        className="mb-2"
      />
      <footer className="flex justify-between mt-6">
        <Button
          onClick={handleClearForm}
          type="danger"
          disabled={status === "loading"}
        >
          Clear Form
        </Button>
        <Button
          onClick={handleSubmit}
          type="primary"
          isLoading={status === "loading"}
        >
          Submit Form
        </Button>
      </footer>
    </div>
  );
};

export default MultiselectBuilderForm;
