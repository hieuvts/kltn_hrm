import MyDrawer from "./components/MyDrawer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomRoutes from "./components/CustomRoutes";
import Dashboard from "./pages/Dashboard";
import Department from "./pages/Department";
import Employee from "./pages/Dashboard";
import Others from "./pages/Others";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/404NotFound";
import React from "react";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MyDrawer />} />
        <Route path="404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
