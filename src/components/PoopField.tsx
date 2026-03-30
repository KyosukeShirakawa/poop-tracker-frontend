import type { CreateDailyLogForm } from "../types/DailyLogDto";
import { SizeEnum, ColorEnum, SoftnessEnum } from "../types/PoopDto";

interface PoopFieldProps {
  dailyLog: CreateDailyLogForm;
  onChange: (data: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PoopField = ({ dailyLog, onChange }: PoopFieldProps) => {
  return (
    <fieldset>
      <div className="flex flex-col items-center gap-2">
        <legend>How was your poop?</legend>
        <div>
          <label>Size</label>
          <select
            name="size"
            value={dailyLog.poopDTO?.size}
            onChange={onChange}
          >
            {Object.entries(SizeEnum).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <label>Color</label>
          <select
            name="color"
            value={dailyLog.poopDTO?.color}
            onChange={onChange}
          >
            {Object.entries(ColorEnum).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <label>Softness</label>
          <select
            name="softness"
            value={dailyLog.poopDTO?.softness}
            onChange={onChange}
          >
            {Object.entries(SoftnessEnum).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </fieldset>
  );
};

export default PoopField;
