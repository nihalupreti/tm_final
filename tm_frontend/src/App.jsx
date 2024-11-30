import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import DashBoard from "./components/DashBoard";
import CompletedTodos from "./components/CompletedTodos";

function App() {
  return (
    <BrowserRouter>
      <AuthHandler />
      <Routes>
        <Route path="/" element={<NavigateBasedOnAuth />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/completed" element={<CompletedTodos />} />
      </Routes>
    </BrowserRouter>
  );
}

function AuthHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (
      token &&
      (location.pathname === "/signin" || location.pathname === "/signup")
    ) {
      navigate("/dashboard");
    } else if (
      !token &&
      location.pathname !== "/signin" &&
      location.pathname !== "/signup"
    ) {
      navigate("/signin");
    }
  }, [navigate, location]);

  return null;
}

function NavigateBasedOnAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    navigate(token ? "/dashboard" : "/signin");
  }, [navigate]);

  return null;
}

export default App;
