import { useEffect, useState } from "react";
import { getAllUsers, createUser } from "../../services/user.service";
import type { UserDto } from "../../types/UserDto";
import type { CreateUserDto } from "../../types/CreateUserDto";
import { Link } from "react-router-dom";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  useEffect(() => {
    getAllUsers().then((response) => setUsers(response.data));
  }, []);
  console.log(users);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

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
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.name}</Link>
          </li>
        ))}
      </ul>

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
};

export default AdminUsersPage;
