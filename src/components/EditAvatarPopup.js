import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../hooks/useFormValidation.js";

function EditAvatarPopup({ isOpen, isLoading, onClose, onUpdateAvatar }) {
  const { inputValues, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputValues);
  }

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Change profile picture"
      buttonText={isLoading ? "Saving..." : "Save"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="link-avatar"
        name="link-avatar"
        className="form__input"
        type="url"
        onChange={handleChange}
        value={inputValues['link-avatar'] || ''}
        placeholder="Image link"
        required
      />
      <span className={`form__input-error link-avatar-input-error`}>
        {" "}
        {`${errors["link-avatar"] ?? ""}`}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
