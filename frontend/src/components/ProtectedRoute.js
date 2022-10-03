import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({children, isLoggedIn}) {
    return(
        <Route path='/'> 
            {isLoggedIn ? children : <Redirect to={'/around-react/signin'} /> }
        </Route>
    )
}

export default ProtectedRoute; 
