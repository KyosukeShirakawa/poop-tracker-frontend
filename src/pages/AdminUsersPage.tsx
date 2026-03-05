import { useEffect, useState } from "react";
import "./App.css";
import { getAllUsers, createUser } from "../services/user.service";
import type { UserDto } from "../types/UserDto";
import type { CreateUserDto } from "../types/CreateUserDto";
import UserList from "../components/UserList";

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
      <UserList users={users} />
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
