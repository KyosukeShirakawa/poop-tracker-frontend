import { Link } from "react-router-dom";
import type { DailyLog } from "../types/DailyLogDto";
import { useState } from "react";
import type { PoopDTO } from "../types/PoopDto";

type HeatmapDay = {
  date: string;
  score: number | null;
  poop: PoopDTO | null;
};

const mapLogsByDate = (logs: DailyLog[]) => {
  const map = new Map<string, PoopDTO | null>();

  logs.forEach((log) => {
    map.set(log.date, log.poopDTO ?? null);
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
      poop: null,
    });

    date.setDate(date.getDate() + 1);
  }

  return days;
};

const buildHeatmapData = (logs: DailyLog[], year: number) => {
  const logMap = mapLogsByDate(logs);
  const allDays = generateYearDays(year);

  return allDays.map((day) => {
    const poop = logMap.get(day.date);

    return {
      ...day,
      score: poop?.score ?? null,
      poop,
    };
  });
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
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  return (
    <div className="heatmap">
      <div className="grid">
        {days.map((day) => (
          <Link
            key={day.date}
            to={`/logs/${day.date}`}
            className="cell"
            style={{ backgroundColor: getColor(day.score) }}
            onMouseEnter={(e) => {
              setHoveredDay(day);
              setTooltipPos({ x: e.clientX, y: e.clientY });
            }}
            onMouseLeave={() => setHoveredDay(null)}
          ></Link>
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
      {hoveredDay && (
        <div
          className="tooltip"
          style={{
            top: tooltipPos.y - 30,
            left: tooltipPos.x + 10,
            position: "fixed",
          }}
        >
          <h4>{hoveredDay.date}</h4>
          <p>Score: {hoveredDay.score ?? 0}</p>
          {hoveredDay.poop && (
            <div className="flex gap-4">
              <div className="">
                <p>Color</p>
                <p>{hoveredDay.poop.color}</p>
              </div>
              <div>
                <p>Size</p>
                <p>{hoveredDay.poop.size}</p>
              </div>
              <div>
                <p>Consistency</p>
                <p>{hoveredDay.poop.softness}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Heatmap;
