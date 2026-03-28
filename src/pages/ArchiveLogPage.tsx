import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { deleteLog, getLogsByUserId } from "../services/log.service";
import { Navigate, Link } from "react-router-dom";
import type { DailyLog } from "../types/DailyLogDto";

const ArchiveLogPage = () => {
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

  const handleClickDeleteLog = (logId: string) => {
    deleteLog(user.id, logId);
    setLogs((prev) => prev.filter((l) => String(l.id) !== logId));
  };
  return (
    <div className="content">
      <h2>History</h2>
      <div className="flex flex-col items-center gap-2">
        <h4>{user.username}</h4>
        <div className="flex flex-col gap-2">
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

export default ArchiveLogPage;
