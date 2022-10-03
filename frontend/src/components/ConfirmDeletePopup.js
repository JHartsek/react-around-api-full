import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, isLoading, onClose, onConfirmCardDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmCardDelete();
  }

  return (
    <PopupWithForm
      name="confirm-delete"
      title="Are you sure?"
      buttonText={isLoading ? "Deleting..." : "Yes"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
    />
  );
}

export default ConfirmDeletePopup;
