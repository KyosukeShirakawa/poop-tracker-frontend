import { Link, Navigate, useParams } from "react-router-dom";
import { type CreateDailyLogForm } from "../types/DailyLogDto";
import { useContext, useEffect, useState } from "react";
import { getLogByDate, updateLog } from "../services/log.service";
import { UserContext } from "../context/UserContext";
import LogForm from "../components/LogForm";

const SingleLogPage = () => {
  const { date } = useParams();

  const { user } = useContext(UserContext);
  const [log, setLog] = useState<CreateDailyLogForm | null>(null);
  const [logId, setLogId] = useState<string | null>(null);
  const [logDate, setLogDate] = useState<string>("");

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!date) {
    return <Navigate to={`/dashboard/${user.id}`} />;
  }

  useEffect(() => {
    const fetchLog = async () => {
      const data = await getLogByDate(user.id, date);

      setLogId(String(data.id));
      setLogDate(data.date);
      setLog({
        poopDTO: data.poopDTO ? data.poopDTO : null,
        foodsEaten: data.foodsEaten ? data.foodsEaten : [],
      });
    };

    fetchLog();
  }, [user, date]);

  if (!log) {
    return <div>loading....</div>;
  }

  const handleSubmitForm = async (data: CreateDailyLogForm) => {
    if (user?.id && logId) {
      console.log(data);
      const updatedLog = await updateLog(user.id, logId, data);
      console.log(updatedLog);
    }
  };
  return (
    <div className="content">
      <div className="flex items-center gap-2">
        <Link to={`/logs/2026-03-27`}>
          <p>＜</p>
        </Link>
        <h2>{date}</h2>
        <Link to={`/logs/2026-03-28`}>
          <p>＞</p>
        </Link>
      </div>
      {log ? (
        <LogForm initialData={log} onSubmit={handleSubmitForm} />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default SingleLogPage;
