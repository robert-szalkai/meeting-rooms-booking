import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import TabletApp from "../components/TabletApp/TabletApp";
import Admin from "../components/Admin/Admin";
import RoomSelection from "../components/RoomSelection/RoomSelection";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../components/LoginPage/LoginPage";
import PageNotFound from "../components/PageNotFound/PageNotFound";

const MainRouter = () => {
    const [userType] = useState<string | null>(
        localStorage.getItem("user_type")
    );
    const [authenticated] = useState<string | null>(
        localStorage.getItem("authenticated")
    );

    return (
        <BrowserRouter>
            <Routes>
                {/* This piece of code redirects you to the main page based by user_type 
                and by checking if user is authenticated. */}
                {userType === "admin" && authenticated === "authenticated" ? (
                    <Route path={"/"} element={<Navigate to="/admin" />} />
                ) : userType === "user" && authenticated === "authenticated" ? (
                    <Route path={"/"} element={<Navigate to="/selection" />} />
                ) : (
                    <Route path={"/"} element={<Navigate to="login" />} />
                )}

                {/* 404 ROUTE */}
                <Route path="/404" element={<PageNotFound />} />

                {/* LOGIN ROUTES */}
                <Route
                    path="login"
                    element={
                        <ProtectedRoute
                            typeOfUser={null}
                            auth={null}
                            redirectPath="/"
                        >
                            <LoginPage />
                        </ProtectedRoute>
                    }
                />

                {/* ADMIN ROUTES */}
                <Route
                    path="admin"
                    element={
                        <ProtectedRoute
                            typeOfUser={"admin"}
                            auth={"authenticated"}
                            redirectPath="/"
                        >
                            <Admin />
                        </ProtectedRoute>
                    }
                />
                {/* USER ROUTES */}
                <Route
                    path="selection"
                    element={
                        <ProtectedRoute
                            typeOfUser={"user"}
                            auth={"authenticated"}
                            redirectPath="/"
                        >
                            <RoomSelection />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="rooms/:id/*"
                    element={
                        <ProtectedRoute
                            typeOfUser={"user"}
                            auth={"authenticated"}
                            redirectPath="/"
                        >
                            <TabletApp />
                        </ProtectedRoute>
                    }
                />

                {/* Redirect to 404 page for any other route */}
                <Route path="/*" element={<Navigate to="/404" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
