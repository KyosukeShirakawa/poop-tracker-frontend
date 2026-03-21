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
    <div>
      <h2>Log in</h2>
      <form onSubmit={(e) => handleClickLogin(e)}>
        username: <input type="text" name="username" />
        password: <input type="text" name="password" />
        <button>log in</button>
      </form>
    </div>
  );
};

export default LoginPage;
