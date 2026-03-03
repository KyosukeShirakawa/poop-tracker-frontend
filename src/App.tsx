import { useEffect, useState } from "react";
import "./App.css";
import { getAllUsers } from "./services/user.service";
import type { UserDto } from "./types/UserDto";
import FoodList from "./components/FoodList";

function App() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  useEffect(() => {
    getAllUsers().then((response) => setUsers(response.data));
  }, []);

  const createUser = (e) => {
    e.preventDefault();

    const createUserDto = {
      name: newUserName,
      password: newUserPassword,
    };
    createUser(createUserDto).then((response) => {
      setUsers(users.concat(response.data));
      setNewUserName("");
      setNewUserPassword("");
    });
  };

  const handleUserNameChange = (e) => {
    console.log(e.target.value);
    setNewUserName(e.target.value);
  };
  const handleUserPasswordChange = (e) => {
    console.log(e.target.value);
    setNewUserName(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-5">p**p</h1>
      {users.map((u) => (
        <div className="mb-4 flex flex-col items-center" key={u.id}>
          <h2 className="text-2xl font-bold mb-4">{u.name}</h2>
          <div className="flex gap-16">
            <FoodList title="safe food list" foodlist={u.safeFoodList} />
            <FoodList title="avoid food list" foodlist={u.avoidFoodList} />
          </div>
        </div>
      ))}
      <form onSubmit={createUser}>
        <input value={newUserName} onChange={handleUserNameChange} />
        <input value={newUserPassword} onChange={handleUserPasswordChange} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default App;
