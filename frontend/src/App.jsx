import MyDrawer from "./components/MyDrawer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Department from "./pages/Department";
import Employee from "./pages/Dashboard";
import Others from "./pages/Others";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/404NotFound";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <MyDrawer />
        <div
          style={{
            marginLeft: "240px",
            boderColor: "black",
            border: "solid",
            height: "100",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/department" element={<Department />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/others" element={<Others />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
