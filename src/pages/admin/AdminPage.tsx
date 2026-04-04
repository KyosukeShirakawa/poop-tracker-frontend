import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="main">
      <div className="page-title">
        <h2>Admin</h2>
      </div>
      <div className="content">
        <Link to={"users"}>users</Link>
      </div>
    </div>
  );
};

export default AdminPage;
