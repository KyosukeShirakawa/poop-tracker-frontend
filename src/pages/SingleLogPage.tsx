import { Navigate, useParams } from "react-router-dom";
import {
  type CreateDailyLogForm,
  type CreateDailyLogRequest,
} from "../types/DailyLogDto";
import { useContext, useEffect, useState } from "react";
import { createLog, getLogByDate, updateLog } from "../services/log.service";
import { UserContext } from "../context/UserContext";
import LogForm from "../components/LogForm";
import DateControl from "../components/DateControl";

const SingleLogPage = () => {
  const { date } = useParams();

  const { user } = useContext(UserContext);
  const [log, setLog] = useState<CreateDailyLogForm | null>(null);
  const [logId, setLogId] = useState<string | null>(null);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!date) {
    return <Navigate to={`/home/${user.id}`} />;
  }

  useEffect(() => {
    if (!date) {
      return;
    }

    const fetchLog = async () => {
      try {
        const data = await getLogByDate(user.id, date);

        setLogId(String(data.id));
        setLog({
          poopDTO: data.poopDTO ? data.poopDTO : null,
          foodsEaten: data.foodsEaten ? data.foodsEaten : [],
        });
      } catch {
        setLogId(null);
        setLog({
          poopDTO: null,
          foodsEaten: [],
        });
      }
    };
    fetchLog();
  }, [user, date]);

  if (!log) {
    return <div>loading....</div>;
  }
  const handleSubmitForm = async (formData: CreateDailyLogForm) => {
    if (!user) return;
    console.log(formData);
    if (logId) {
      const updatedLog = await updateLog(user.id, logId, formData);
      console.log(updatedLog);
    } else {
      console.log(date);
      const dataToSend: CreateDailyLogRequest = { ...formData, date: date };
      const createdLog = await createLog(user.id, dataToSend);
      console.log(createdLog);

      setLogId(String(createdLog.id));
    }
  };

  return (
    <div className="main">
      <div className="page-title">
        <DateControl date={date} />
      </div>
      <div className="content">
        {log ? (
          <LogForm
            dailyLog={log}
            onChange={setLog}
            onSubmit={handleSubmitForm}
          />
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

export default SingleLogPage;
