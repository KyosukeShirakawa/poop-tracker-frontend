import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import User from "./pages/admin/AdminUserPage";
import SingleLogPage from "./pages/SingleLogPage";
import { UserContextProvider } from "./context/UserContext";
import HistoryPage from "./pages/HistoryPage";
import Header from "./components/Header";
import MyFoodPage from "./pages/MyFoodPage";

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Header />

        <Routes>
          <Route path="/home/:id" element={<HomePage />} />
          <Route path="/logs/" element={<HistoryPage />} />
          <Route path="/logs/:date" element={<SingleLogPage />} />
          <Route path="/foodlist" element={<MyFoodPage />} />
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
