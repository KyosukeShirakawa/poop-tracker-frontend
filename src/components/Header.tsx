import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="header">
      <div className="header-left">
        <Link className="btn" to={"/home/1"}>
          Home
        </Link>
        <Link className="btn" to={"/logs"}>
          History
        </Link>
        <Link className="btn" to={"/analysis"}>
          Analysis
        </Link>
        <Link className="btn" to={"/foodlist"}>
          My Food
        </Link>
      </div>

      <div className="header-right">
        <Link className="btn" to={"/login"}>
          Log in
        </Link>
        <Link className="btn" to={"/admin"}>
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Header;
