import type { DailyLog } from "../types/DailyLogDto";

interface LogsPageProps {
  log: DailyLog;
}

const LogsPage = ({ log }: LogsPageProps) => {
  return (
    <div>
      <h2>{log.date}</h2>
    </div>
  );
};

export default LogsPage;
