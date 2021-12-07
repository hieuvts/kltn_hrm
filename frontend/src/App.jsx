import MyDrawer from "./components/MyDrawer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Department from "./pages/Department";
import Employee from "./pages/Dashboard";
import Others from "./pages/Others";
import AboutUs from "./pages/AboutUs";

export default function App() {
  return (
    <>
      <Router>
        <MyDrawer />
        <Routes>
          <Route path="/" exact component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/department" component={Department} />
          <Route path="/employee" component={Employee} />
          <Route path="/others" component={Others} />
          <Route path="/about" component={AboutUs} />
        </Routes>
      </Router>
    </>
  );
}
