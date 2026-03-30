import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="header">
      <div className="header-left">
        <Link className="bg-black p-2 rounded text-white" to={"/dashboard/1"}>
          Dashboard
        </Link>
        <Link className="bg-black p-2 rounded text-white" to={"/logs"}>
          History
        </Link>
      </div>

      <div className="header-right">
        <Link className="bg-black p-2 rounded text-white" to={"/login"}>
          Log in
        </Link>
        <Link className="bg-black p-2 rounded text-white" to={"/admin"}>
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Header;
