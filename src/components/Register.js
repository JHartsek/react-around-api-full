import React from "react";
import AuthForm from "./AuthForm";

function Register({onSignUp, currentPage, onLinkClick, isLoading}) {   
    return(
        <AuthForm       
        name="signup"
        title="Sign up"
        buttonText={isLoading ? "Signing you up..." : "Sign up"}
        onSubmit={onSignUp}
        onLinkClick={onLinkClick}
        currentPage={currentPage}
        />
    )
}

export default Register; 