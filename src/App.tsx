import { useEffect, useState } from "react";
import "./App.css";
import { getAllUsers, createUser } from "./services/user.service";
import type { UserDto } from "./types/UserDto";
import FoodList from "./components/FoodList";
import type { CreateUserDto } from "./types/CreateUserDto";

function App() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  useEffect(() => {
    getAllUsers().then((response) => setUsers(response.data));
  }, []);

  const userCreation = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const createUserDto: CreateUserDto = {
      name: newUserName,
      password: newUserPassword,
    };
    createUser(createUserDto).then((response) => {
      console.log(response.data);
      setUsers(users.concat(response.data as unknown as UserDto));
      setNewUserName("");
      setNewUserPassword("");
    });
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
      <form onSubmit={userCreation}>
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          type="text"
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default App;
