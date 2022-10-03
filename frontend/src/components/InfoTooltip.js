import registrationSuccess from '../images/registration-success.svg'; 
import registrationFailure from '../images/registration-failure.svg'; 

function InfoTooltip({
  name,
  status,
  isOpen,
  onClose
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button popup__close-button-info-tool"
          aria-label="close-popup"
          onClick={onClose}
        ></button>
        <section className="info-tool-tip"> 
        <img className="info-tool-tip__image" src={status === 'success' ? registrationSuccess : registrationFailure} alt={status === 'success' ? 'Check mark' : 'X mark'}/>
        <h1 className="info-tool-tip__title"> {status === 'success' ? 'Success! You have now been registered.' : 'Oops, something went wrong! Please try again.'}</h1>
        </section>
      </div>
    </section>
  );
}

export default InfoTooltip;
