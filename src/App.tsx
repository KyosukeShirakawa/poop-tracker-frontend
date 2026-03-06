import "./App.css";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import User from "./pages/admin/AdminUserPage";

const App = () => {
  return (
    <Router>
      <nav className="flex gap-3 p-3 bg-cyan-500">
        <Link className="bg-teal-700 p-2 rounded text-white" to={"/dashboard"}>
          Dashboard
        </Link>
        <Link className="bg-teal-700 p-2 rounded text-white" to={"/login"}>
          Log in
        </Link>
        <Link className="bg-teal-700 p-2 rounded text-white" to={"/admin"}>
          Admin
        </Link>
      </nav>

      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="users/:id" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
