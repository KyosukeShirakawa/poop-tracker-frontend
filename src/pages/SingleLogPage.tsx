import { Navigate, useParams } from "react-router-dom";
import type { CreateDailyLogForm } from "../types/DailyLogDto";
import { useContext, useEffect, useState } from "react";
import { getLogByDate, updateLog } from "../services/log.service";
import { UserContext } from "../context/UserContext";
import LogForm from "../components/LogForm";

const SingleLogPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [log, setLog] = useState<CreateDailyLogForm | null>(null);
  const [logId, setLogId] = useState<string | null>(null);
  const [logDate, setLogDate] = useState<string>("");

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!id) {
    return <Navigate to={`/dashboard/${user.id}`} />;
  }

  useEffect(() => {
    const fetchLog = async () => {
      const data = await getLogByDate(user.id, id);
      setLogId(String(data.id));
      setLogDate(data.date);
      setLog({
        poopDTO: data.poopDTO,
        foodsEaten: data.foodsEaten.map((f) => f.name),
      });
    };
    fetchLog();
  }, [user, id]);

  if (!log) {
    return <div>loading....</div>;
  }

  const handleSubmitForm = async (data: CreateDailyLogForm) => {
    if (user?.id) {
      const updatedLog = await updateLog(user.id, logId, data);
      console.log(updatedLog);
    }
  };
  return (
    <div>
      <h2>{logDate}</h2>
      <LogForm initialData={log} onSubmit={handleSubmitForm} />
    </div>
  );
};

export default SingleLogPage;
