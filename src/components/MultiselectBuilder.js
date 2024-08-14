import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../reducers/multiselectBuilderSlice";
import MultiselectBuilderForm from "./MultiselectBuilderForm";

import { multiselectFormValidationSchema as validationSchema } from "../utils/constants";
import { validateField, validateForm } from "../utils/helpers";

const MultiselectBuilder = ({ formHeading }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.multiselectBuilderForm);

  const [label, setLabel] = useState("");
  const [isMultiselect, setIsMultiselect] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const [comboBoxChoices, setComboBoxChoices] = useState([]);
  const [comboboxInputValue, setComboboxInputValue] = useState("");
  const [shouldDisplayAlpha, setShouldDisplayAlpha] = useState(false);

  const [errors, setErrors] = useState({});

  const stateValues = {
    label,
    isMultiselect,
    isRequired,
    defaultValue,
    combobox: comboboxInputValue,
    shouldDisplayAlpha,
  };

  const handleClearForm = () => {
    setLabel("");
    setIsMultiselect(false);
    setIsRequired(false);
    setDefaultValue("");
    setComboBoxChoices([]);
    setShouldDisplayAlpha(false);

    setErrors({});
  };

  // Used to set validation errors to different fields
  const setError = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
  };

  const handleLabelChange = (e) => {
    const value = e.target.value;
    setLabel(value);

    const error = validateField("label", value, validationSchema);
    setError("label", error);
  };

  const handleDefaultValueChange = (e) => {
    const value = e.target.value;
    setDefaultValue(value);

    const error = validateField("defaultValue", value, validationSchema);
    setError("defaultValue", error);
  };

  const handleComboboxInputChange = (e) => {
    const value = e.target.value;
    setComboboxInputValue(value);
    const error = validateField(
      "combobox",
      value,
      validationSchema,
      comboBoxChoices
    );

    setError("combobox", error);
  };
  const handleSubmit = () => {
    if (
      validateForm({ validationSchema, stateValues, validateField, setErrors })
    ) {
      const formData = {
        label,
        isMultiselect,
        isRequired,
        defaultValue,
        comboBoxChoices,
        shouldDisplayAlpha,
      };

      console.log("Form Data:", formData);
      dispatch(submitForm(formData));
    }
  };

  return (
    <MultiselectBuilderForm
      formHeading={formHeading}
      status={status}
      label={label}
      setLabel={setLabel}
      handleLabelChange={handleLabelChange}
      isMultiselect={isMultiselect}
      setIsMultiselect={setIsMultiselect}
      isRequired={isRequired}
      setIsRequired={setIsRequired}
      defaultValue={defaultValue}
      setDefaultValue={setDefaultValue}
      handleDefaultValueChange={handleDefaultValueChange}
      comboboxInputValue={comboboxInputValue}
      setComboboxInputValue={setComboboxInputValue}
      handleComboboxInputChange={handleComboboxInputChange}
      comboBoxChoices={comboBoxChoices}
      setComboBoxChoices={setComboBoxChoices}
      shouldDisplayAlpha={shouldDisplayAlpha}
      setShouldDisplayAlpha={setShouldDisplayAlpha}
      errors={errors}
      setError={setError}
      handleClearForm={handleClearForm}
      handleSubmit={handleSubmit}
    />
  );
};

export default MultiselectBuilder;
