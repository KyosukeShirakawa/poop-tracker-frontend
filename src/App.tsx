import "./App.css";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import User from "./pages/admin/AdminUserPage";
import SingleLogPage from "./pages/SingleLogPage";
import { UserContextProvider } from "./context/UserContext";
import CreateLogPage from "./pages/CreateLogPage";
import ArchiveLogPage from "./pages/ArchiveLogPage";

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <nav className="flex gap-3 p-3 bg-gray-200">
          <Link className="bg-black p-2 rounded text-white" to={"/dashboard/1"}>
            Dashboard
          </Link>
          <Link className="bg-black p-2 rounded text-white" to={"/logs"}>
            History
          </Link>
          <Link className="bg-black p-2 rounded text-white" to={"/login"}>
            Log in
          </Link>
          <Link className="bg-black p-2 rounded text-white" to={"/admin"}>
            Admin
          </Link>
        </nav>

        <Routes>
          <Route path="/dashboard/:id" element={<DashboardPage />} />
          <Route path="/logs/" element={<ArchiveLogPage />} />
          <Route path="/logs/:date" element={<SingleLogPage />} />
          <Route path="/logs/new" element={<CreateLogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="users/:id" element={<User />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
