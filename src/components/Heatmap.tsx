import type { DailyLog } from "../types/DailyLogDto";

type HeatmapDay = {
  date: string;
  score: number | null;
};

const mapLogsByDate = (logs: DailyLog[]) => {
  const map = new Map<string, number | null>();

  logs.forEach((log) => {
    map.set(log.date, log.poopDTO?.score ?? null);
  });
  return map;
};

const generateYearDays = (year: number) => {
  const days: HeatmapDay[] = [];
  const date = new Date(year, 0, 1);

  while (date.getFullYear() === year) {
    days.push({
      date: date.toISOString().split("T")[0],
      score: null,
    });

    date.setDate(date.getDate() + 1);
  }

  return days;
};

const buildHeatmapData = (logs: DailyLog[], year: number) => {
  const logMap = mapLogsByDate(logs);
  const allDays = generateYearDays(year);

  return allDays.map((day) => ({
    ...day,
    score: logMap.get(day.date) ?? null,
  }));
};

const getColor = (score: number | null) => {
  if (score === null) return "rgb(202, 202, 202)";
  if (score >= 10) return "#02570f";
  if (score >= 8) return "#009414";
  if (score >= 6) return "#35d848";
  if (score >= 4) return "#c2ebc8";
  return "rgb(202, 202, 202)";
};

interface HeatmapProps {
  logs: DailyLog[];
}

const Heatmap = ({ logs }: HeatmapProps) => {
  const currentYear = new Date().getFullYear();
  const days = buildHeatmapData(logs, currentYear);

  return (
    <div className="heatmap">
      <div className="grid">
        {days.map((day) => (
          <div
            key={day.date}
            className="cell"
            style={{ backgroundColor: getColor(day.score) }}
          ></div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <span>less</span>
        <div className="cell" style={{ backgroundColor: getColor(null) }}></div>
        <div className="cell" style={{ backgroundColor: getColor(4) }}></div>
        <div className="cell" style={{ backgroundColor: getColor(6) }}></div>
        <div className="cell" style={{ backgroundColor: getColor(8) }}></div>
        <div className="cell" style={{ backgroundColor: getColor(10) }}></div>
        <span>more</span>
      </div>
    </div>
  );
};

export default Heatmap;
