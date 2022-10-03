function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  children,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="close-popup"
          onClick={onClose}
        ></button>
        <form
          className={`${name}-form form`}
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          <h2 className={`form__title form__title-${name}`}> {title}</h2>
          {children}
          <button
            type="submit"
            className={`form__save-button ${
              !isValid ? "form__save-button_disabled" : ""
            }`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
