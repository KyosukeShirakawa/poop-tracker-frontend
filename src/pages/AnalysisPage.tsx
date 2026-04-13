import { useContext, useEffect, useState } from "react";
import { getLogsByUserId } from "../services/log.service";
import { UserContext } from "../context/UserContext";
import type { DailyLog } from "../types/DailyLogDto";
import { Navigate } from "react-router-dom";
import Heatmap from "../components/Heatmap";

const AnalysisPage = () => {
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
  }, []);
  return (
    <div className="main">
      <div className="page-title">
        <h2>Analysis</h2>
      </div>
      <div className="content">
        <Heatmap logs={logs} />
      </div>
    </div>
  );
};

export default AnalysisPage;
