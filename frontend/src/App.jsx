import MyDrawer from "./components/MyDrawer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Department from "./pages/Department";
import Employee from "./pages/Dashboard";
import Others from "./pages/Others";
import AboutUs from "./pages/AboutUs";

import MiniDrawer from "./test2.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* <MyDrawer /> */}
        <MiniDrawer />
        <div
          style={{ marginLeft: "240px", boderColor: "black", border: "solid", height: '100' }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/department" element={<Department />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/others" element={<Others />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
