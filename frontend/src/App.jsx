import MyDrawer from "./components/MyDrawer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/404NotFound/404NotFound";
import React from "react";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MyDrawer />} />
        <Route path="404" element={<NotFound />} />
      </Routes>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/ivan-abirawa"
          title="Ivan Abirawa"
        >
          Ivan Abirawa
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </BrowserRouter>
  );
}
