import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Admin from "./pages/Admin.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<App />} />

                <Route
                    path="/hidden-admin"
                    element={<AdminLogin />}
                />

                <Route
                    path="/hidden-admin/dashboard"
                    element={<Admin />}
                />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);