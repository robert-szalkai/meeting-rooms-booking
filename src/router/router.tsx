// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import TabletApp from "../components/TabletApp/TabletApp";
// import Admin from "../components/Admin/Admin";
// import RoomSelection from "../components/RoomSelection/RoomSelection";
// const MainRouter = () => {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="admin" element={<Admin />} />

//                 <Route path="rooms/:id*" element={<TabletApp />} />
//                 <Route path="selection" element={<RoomSelection />} />
//             </Routes>
//         </BrowserRouter>
//     );
// };
// export default MainRouter;

import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import TabletApp from "../components/TabletApp/TabletApp";
import Admin from "../components/Admin/Admin";
import RoomSelection from "../components/RoomSelection/RoomSelection";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../components/LoginPage/LoginPage";
import PageNotFound from "../components/PageNotFound/PageNotFound";

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="/" element={<LoginPage />} />
                <Route path="/404" element={<PageNotFound />} />
                <Route
                    path="admin"
                    element={
                        <ProtectedRoute
                            typeOfUser={"admin"}
                            redirectPath="/selection"
                        >
                            <Admin />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="selection"
                    element={
                        <ProtectedRoute
                            typeOfUser={"user"}
                            redirectPath="/admin"
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
                            redirectPath="/admin"
                        >
                            <TabletApp />
                        </ProtectedRoute>
                    }
                />
                {/* Redirect to RoomSelection page for any other route */}
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
