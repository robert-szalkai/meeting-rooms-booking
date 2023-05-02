import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
    typeOfUser,
    redirectPath,
    children,
}: {
    typeOfUser: string;
    redirectPath: string;
    children: JSX.Element;
}) => {
    const userType = localStorage.getItem("user_type");
    return typeOfUser === userType ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
