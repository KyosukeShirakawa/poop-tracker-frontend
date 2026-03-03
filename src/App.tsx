import { useEffect, useState } from "react";
import "./App.css";
import { getAllUsers } from "./services/user.service";
import type { UserDto } from "./types/UserDto";

function App() {
  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    getAllUsers().then((response) => setUsers(response.data));
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-5">p**p</h1>
      {users.map((u) => (
        <div className="mb-4 flex flex-col items-center" key={u.id}>
          <h2 className="text-2xl font-bold mb-4">{u.name}</h2>
          <div className="flex gap-16">
            {" "}
            <div className="mb-4">
              <h4 className="text-xl font-bold">safe food list</h4>
              <ul>
                {u.safeFoodList.map((f) => (
                  <li className="list-disc" key={f.id}>
                    {f.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold">avoid food list</h4>
              <ul>
                {u.avoidFoodList.map((f) => (
                  <li className="list-disc" key={f.id}>
                    {f.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
