import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import type { DailyLog } from "../types/DailyLogDto";
import { deleteLog, getLogsByUserId } from "../services/log.service";

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
  }, [user, logs]);

  const handleClickDeleteLog = (logId: string) => {
    deleteLog(user.id, logId);
  };
  return (
    <div className="flex flex-col items-center p-10 gap-2">
      <h2>Dashboard</h2>
      <div className="flex flex-col items-center gap-2">
        <h4>{user.username}</h4>
        <div className="flex flex-col">
          {logs.map((l) => (
            <div className="flex gap-3" key={l.id}>
              <Link to={`/logs/${l.date}`}>{l.date}</Link>
              <button onClick={() => handleClickDeleteLog(String(l.id))}>
                Delete
              </button>
            </div>
          ))}
        </div>
        <Link to={"/logs/new"}>create log</Link>
      </div>
    </div>
  );
};

export default DashboardPage;
