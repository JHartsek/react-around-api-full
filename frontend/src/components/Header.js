import React from 'react';
import { Link } from 'react-router-dom';
import logoFile from '../images/logo.svg'; 


function Header({currentPage, device, onLoginClick, onSignUpClick, onLogoutClick, email}) {
    return (
        <header className="header">
            <img id="logo-image" className="logo" src={logoFile} alt="Around The U.S logo" />
            {currentPage === 'login' && <Link to={"/around-react/signup"} onClick={onSignUpClick} className='header__link'> Sign up </Link>}
            {currentPage === 'signup' && <Link to={"/around-react/signin"} onClick={onLoginClick} className='header__link'> Login </Link>}
            {currentPage === 'home' &&
                <div className='header__options'>
                    {device === 'computer' && <p className='header__options__email'> {email} </p>}
                    <Link to={"/around-react/login"} onClick={onLogoutClick} className='header__options__link'> Sign out </Link>
                </div>}
        </header>
    )
}

export default Header;