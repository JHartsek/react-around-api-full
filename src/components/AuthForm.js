import { useFormValidation } from "../hooks/useFormValidation.js";
import { Link } from 'react-router-dom';

function AuthForm({
  name,
  currentPage, 
  title,
  buttonText,
  onLinkClick, 
  onSubmit
}) {
  function handleSubmit(e) {
    e.preventDefault();
    const {email, password } = inputValues
    onSubmit(email, password);
  }

  const { inputValues, handleChange } =
  useFormValidation();

  return (
    <section
      className={name}
    >
        <form
          className='form form-auth'
          name={`${name}-form`}
          onSubmit={handleSubmit}
        >
          <h1 className={`form-auth__title form-auth__title-${name}`}> {title}</h1>
          <input

        id="email"
        name="email"
        className="form-auth__input"
        type="email"
        value={inputValues.email || ""}
        placeholder="Email"
        onChange={handleChange}
        required
      />

<input
        id="password"
        name="password"
        className="form-auth__input"
        type="password"
        value={inputValues.password || ""}
        onChange={handleChange}
        placeholder="Password"
        required
        minLength="2"
        maxLength="200"
      />

          <button
            type="submit"
            className='form-auth__save-button'
          >
            {buttonText}
          </button>
          {currentPage === 'login' && <Link to={"/around-react/signup"} onClick={onLinkClick} className='form-auth__redirect'> Not a member yet? Sign up here! </Link>}
          {currentPage === 'signup' && <Link to={"/around-react/login"} onClick={onLinkClick} className='form-auth__redirect'> Already a member? Log in here! </Link>}
    
        </form>
    </section>
  );
}

export default AuthForm;
