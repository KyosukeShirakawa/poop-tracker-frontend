import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getUserById } from "../services/user.service";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickLogin = async (e) => {
    e.preventDefault();

    const { id, name } = await getUserById("1");
    setUser({ id, username: name });

    navigate(`/dashboard/${id}`);
  };

  return (
    <div className="content">
      <h2>Log in</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => handleClickLogin(e)}
      >
        <div className="flex flex-col">
          <label>username</label>
          <input type="text" name="username" />
        </div>
        <div className="flex flex-col">
          <label>password</label>
          <input type="text" name="password" />
        </div>
        <button>log in</button>
      </form>
    </div>
  );
};

export default LoginPage;
