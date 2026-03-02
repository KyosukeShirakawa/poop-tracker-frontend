import { useEffect, useState } from "react";
import "./App.css";
import { getAllUsers } from "./services/user.service";
import type { UserDto } from "./types/UserDto";

function App() {
  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    setUsers(getAllUsers());
  }, []);
  return (
    <>
      <h1 className="text-5xl font-bold">p**p</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <h4>{u.name}</h4>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
