import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
    typeOfUser,
    redirectPath,
    auth,
    children,
}: {
    typeOfUser: string | null;
    redirectPath: string;
    auth: string | null;
    children: JSX.Element;
}) => {
    const userType = localStorage.getItem("user_type");
    const authenticated = localStorage.getItem("authenticated");
    return typeOfUser === userType && authenticated === auth ? (
        children
    ) : (
        <Navigate to={redirectPath} />
    );
};

export default ProtectedRoute;
