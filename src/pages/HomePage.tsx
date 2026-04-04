import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import type { CreateDailyLogForm } from "../types/DailyLogDto";
import { getLogByDate } from "../services/log.service";
import { getDate } from "../utils/date";

const HomePage = () => {
  const { user } = useContext(UserContext);
  const [log, setLog] = useState<CreateDailyLogForm | null>();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const date = getDate();
        const { poopDTO, foodsEaten } = await getLogByDate(user.id, date);
        setLog({
          poopDTO: poopDTO ? poopDTO : null,
          foodsEaten: foodsEaten ? foodsEaten : [],
        });
      } catch {
        setLog({
          poopDTO: null,
          foodsEaten: [],
        });
      }
    };

    fetchLog();
  }, [user]);

  return (
    <div className="main">
      <div className="page-title">
        <h2>Today</h2>
      </div>
      <div className="content">
        <div className="grid gap-4">
          <div className="card">
            <h2>Poop</h2>
            <div className="card-content">
              {log?.poopDTO === null ? (
                <p>You haven't pooped yet</p>
              ) : (
                <>
                  <div className="card-content-item">
                    <h4>Size</h4>
                    <div>{log?.poopDTO?.size}</div>
                  </div>
                  <div className="card-content-item">
                    <h4>Color</h4>
                    <div>{log?.poopDTO?.color}</div>
                  </div>
                  <div className="card-content-item">
                    <h4>Consistency</h4>
                    <div>{log?.poopDTO?.softness}</div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="card">
            <h2>Food</h2>
            {log?.foodsEaten?.length === 0 ? (
              <p>You haven't logged food</p>
            ) : (
              <ul>
                {log?.foodsEaten?.slice(0, 7).map((f) => (
                  <li key={f.id ?? f.name}>{f.name}</li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={() => navigate(`/logs/${getDate()}`)}>
            create log
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
