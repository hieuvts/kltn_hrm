import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import MyDrawer from "./components/MyDrawer";
import NotFound from "./pages/404NotFound/404NotFound";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/SignUp";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MyDrawer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
// https://www.flaticon.com/authors/ivan-abirawa
