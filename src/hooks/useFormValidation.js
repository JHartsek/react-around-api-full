import React, { useCallback } from "react";

export function useFormValidation() {
  const [inputValues, setInputValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleChange(e) {
    const form = e.target.closest(".form");
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(form.checkValidity());
  }

  const resetForm = useCallback(() => {
    setInputValues({});
    setErrors({});
    setIsValid(false);
  }, [setInputValues, setErrors, setIsValid]);

  return {
    inputValues,
    errors,
    isValid,
    handleChange,
    setInputValues,
    resetForm,
  };
}
