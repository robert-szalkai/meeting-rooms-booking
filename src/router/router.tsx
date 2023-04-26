import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TabletApp from "../components/TabletApp/TabletApp";
import Admin from "../components/Admin/Admin";
import RoomSelection from "../components/RoomSelection/RoomSelection";
import Chart from "../components/Charts/Chart";
import Hub  from"../components/Hub/Hub"

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="admin" element={<Admin />} />
                <Route path="" element={<Hub />} />
                <Route path="hub" element={<Hub />} />
                <Route path="charts" element={<Chart />} />
                <Route path="rooms/:id*" element={<TabletApp />} />
                <Route path="selection" element={<RoomSelection />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
