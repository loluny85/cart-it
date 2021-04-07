import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom"
import { AppContext } from "../App"

const ProtectedRoute = (props) => {
    const { state } = useContext(AppContext)
    const { loggedIn } = state
    return (
        loggedIn ? <Route {...props} /> : <Redirect to="/" />
    );
};

export default ProtectedRoute;