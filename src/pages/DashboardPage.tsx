import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import type { DailyLog } from "../types/DailyLogDto";
import { getLogsByUserId } from "../services/log.service";

const DashboardPage = () => {
  const { user } = useContext(UserContext);
  const [logs, setLogs] = useState<DailyLog[]>([]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await getLogsByUserId(user.id);
      setLogs(data);
    };

    fetchLogs();
  }, [user]);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h4>name: {user.username}</h4>
        <div className="flex flex-col">
          {logs.map((l) => (
            <Link key={l.id} to={`/logs/${l.date}`}>
              {l.date}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
