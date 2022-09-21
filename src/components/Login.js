import React from "react";
import AuthForm from "./AuthForm";

function Login({onLoginSubmit, currentPage, onLinkClick, isLoading}) {
    return(
        <AuthForm       
        name="login"
        title="Log in"
        buttonText={isLoading ? "Logging in..." : "Log in"}
        onSubmit={onLoginSubmit}
        onLinkClick={onLinkClick}
        currentPage={currentPage}
        />
    )
}

export default Login; 