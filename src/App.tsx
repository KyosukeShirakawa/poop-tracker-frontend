import "./App.css";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import User from "./pages/admin/AdminUserPage";
import SingleLogPage from "./pages/SingleLogPage";
import { UserContextProvider } from "./context/UserContext";
import ArchiveLogPage from "./pages/ArchiveLogPage";
import Header from "./components/Header";

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Header />

        <Routes>
          <Route path="/dashboard/:id" element={<DashboardPage />} />
          <Route path="/logs/" element={<ArchiveLogPage />} />
          <Route path="/logs/:date" element={<SingleLogPage />} />
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
