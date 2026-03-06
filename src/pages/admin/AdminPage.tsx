import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div>
      <h2 className="font-bold text-2xl">Admin</h2>
      <Link to={"users"}>users</Link>
    </div>
  );
};

export default AdminPage;
