import React from "react";
import MyDrawer from "./components/MyDrawer";
import NotFound from "./pages/404NotFound/404NotFound";
import Authentication from "./pages/Authentication/Authentication";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MyDrawer />} />
        <Route path="login" element={<Authentication />} />
        <Route path="404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
// https://www.flaticon.com/authors/ivan-abirawa
