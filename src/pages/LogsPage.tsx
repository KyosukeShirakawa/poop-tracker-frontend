import { Navigate, useParams } from "react-router-dom";
import type { DailyLog } from "../types/DailyLogDto";
import { useContext, useEffect, useState } from "react";
import { getLogByDate } from "../services/log.service";
import { UserContext } from "../context/UserContext";

const LogsPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [log, setLog] = useState<DailyLog | null>(null);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!id) {
    return <Navigate to={`/dashboard/${user.id}`} />;
  }

  useEffect(() => {
    const fetchLog = async () => {
      const data = await getLogByDate(user.id, id);
      setLog(data);
    };
    fetchLog();
  }, [user, id]);

  if (!log) {
    return <div>loading....</div>;
  }
  return (
    <div>
      <h2>{log.date}</h2>
      {log.poopDTO && (
        <div>
          <h4>Poop</h4>
          <ul>
            <li>{log.poopDTO.color}</li>
            <li>{log.poopDTO.size}</li>
            <li>{log.poopDTO.softness}</li>
          </ul>
        </div>
      )}
      {log.foodsEaten && (
        <div>
          <h4>Food you had</h4>
          <ul>
            {log.foodsEaten.map((f) => (
              <li key={f.id}>{f.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LogsPage;
