import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TabletApp from "../components/TabletApp/TabletApp";
import Admin from "../components/Admin/Admin";

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="admin" element={<Admin />} />
                <Route path="rooms/:id*" element={<TabletApp />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;