import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import type { DailyLog } from "../types/DailyLogDto";
import { getLogByDate } from "../services/log.service";
import { getDate } from "../utils/date";

const DashboardPage = () => {
  const { user } = useContext(UserContext);
  const [log, setLog] = useState<DailyLog>();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchLog = async () => {
      const date = getDate();
      const data = await getLogByDate(user.id, date);
      setLog(data);
    };

    fetchLog();
  }, [user]);

  console.log(log);
  return (
    <div className="content">
      <h2>Dashboard</h2>
      <div className="flex flex-col items-center gap-2">
        <div className="grid gap-4">
          <div className="card">
            <h2>Poop</h2>
            <div className="card-content">
              <div>
                <h4>Size</h4>
                {log?.poopDTO?.size}
              </div>
              <div>
                <h4>Color</h4>
                {log?.poopDTO?.color}
              </div>
              <div>
                <h4>Consistency</h4>
                {log?.poopDTO?.softness}
              </div>
            </div>
          </div>
          <div className="card">
            <h2>Food</h2>
            <ul>
              {log?.foodsEaten?.slice(0, 5).map((f) => (
                <li key={f.id ?? f.name}>{f.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <button onClick={() => navigate(`/logs/${getDate()}`)}>
          create log
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
