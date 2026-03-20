import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { UserDto } from "../types/UserDto";
import { getUserById } from "../services/user.service";
import { UserContext } from "../context/UserContext";

const DashboardPage = () => {
  const id = useParams().id;
  const { user } = useContext(UserContext);

  if (!id) {
    return;
  }

  useEffect(() => {
    getUserById(id).then((response) => {
      setUser(response.data);
    });
  }, [user]);
  console.log(user);
  if (!user) {
    return;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h4>{user.name}</h4>
        <div className="flex flex-col">
          {user.logs.map((l) => (
            <Link to={`/logs/${l.id}`}>{l.date}</Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
