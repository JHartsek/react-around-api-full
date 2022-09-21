function ImagePopup({ isOpen, onClose, card }) {
  return (
    <section
      id="focus-image-popup"
      className={`popup ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container-image">
        <button
          id="close-image-button"
          type="button"
          className="popup__close-button"
          aria-label="close-popup"
          onClick={onClose}
        ></button>
        <figure className="popup__content">
          <img
            id="initial-popup-image"
            className="popup__image"
            alt={card.name}
            src={card.link}
          />
          <figcaption className="popup__image-caption"> {card.name}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
