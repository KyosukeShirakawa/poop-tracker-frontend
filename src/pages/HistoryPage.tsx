import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { deleteLog, getLogsByUserId } from "../services/log.service";
import { Navigate, Link, useNavigate } from "react-router-dom";
import type { DailyLog } from "../types/DailyLogDto";
import { getDate } from "../utils/date";

const HistoryPage = () => {
  const { user } = useContext(UserContext);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const navigate = useNavigate();

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
    <div className="main">
      <div className="page-title">
        <h2>History</h2>
      </div>
      <div className="content">
        <div className="flex flex-col gap-2">
          {logs.map((l) => (
            <div className="flex gap-3 items-center" key={l.id}>
              <Link to={`/logs/${l.date}`}>{l.date}</Link>
              <button onClick={() => handleClickDeleteLog(String(l.id))}>
                Delete
              </button>
            </div>
          ))}
        </div>
        <button
          className="btn-lg"
          onClick={() => navigate(`/logs/${getDate()}`)}
        >
          create log
        </button>
      </div>
    </div>
  );
};

export default HistoryPage;
