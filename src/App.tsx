import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((response) => {
      setUsers(response.data);
    });
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
