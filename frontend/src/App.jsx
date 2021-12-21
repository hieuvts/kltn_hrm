import MyDrawer from "./components/MyDrawer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
