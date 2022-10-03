import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useFormValidation } from "../hooks/useFormValidation.js";

function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {
  const { inputValues, isValid, errors, handleChange, setInputValues } =
    useFormValidation();
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(inputValues);
  }

  React.useEffect(() => {
    setInputValues({
      name: currentUser.name ?? "",
      about: currentUser.about ?? "",
    });
  }, [currentUser, isOpen, setInputValues]);

  return (
    <PopupWithForm
      name="profile-edit"
      title="Edit Profile"
      buttonText={isLoading ? "Saving..." : "Save"}
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        name="name"
        className="form__input"
        type="text"
        value={inputValues.name || ""}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="40"
      />
      <span className="form__input-error name-input-error form__input-error_active">
        {" "}
        {`${errors.name ?? ""}`}
      </span>
      <input
        id="about"
        name="about"
        className="form__input"
        type="text"
        value={inputValues.about || ""}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="200"
      />
      <span className="form__input-error about-input-error">
        {" "}
        {`${errors.about ?? ""}`}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
