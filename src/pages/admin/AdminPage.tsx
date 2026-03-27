import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="content">
      <h2>Admin</h2>
      <Link to={"users"}>users</Link>
    </div>
  );
};

export default AdminPage;
