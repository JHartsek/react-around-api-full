import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useFormValidation } from "../hooks/useFormValidation.js";

function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlaceSubmit }) {
  const { inputValues, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit(inputValues);
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="add-post"
      title="New Place"
      buttonText={isLoading ? "Posting..." : "Create"}
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        id="title"
        name="title"
        className="form__input"
        type="text"
        placeholder="Title"
        value={inputValues.title || ""}
        onChange={handleChange}
        minLength="2"
        maxLength="30"
        required
      />
      <span className="form__input-error title-input-error">
        {" "}
        {`${errors.title ?? ""}`}{" "}
      </span>

      <input
        id="link"
        name="link"
        className="form__input"
        type="url"
        placeholder="Image link"
        value={inputValues.link || ""}
        onChange={handleChange}
        required
      />
      <span className="form__input-error link-input-error">
        {" "}
        {`${errors.link ?? ""}`}{" "}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
