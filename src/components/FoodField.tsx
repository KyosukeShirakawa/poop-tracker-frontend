import type { CreateDailyLogForm } from "../types/DailyLogDto";

interface FoodFieldProps {
  dailyLog: CreateDailyLogForm;
  onChange: (ind: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (ind: number) => void;
}

const FoodField = ({ dailyLog, onChange, onClick }: FoodFieldProps) => {
  return (
    <fieldset>
      <div className="flex flex-col items-center gap-2">
        <legend>Foods you ate</legend>
        <div className="flex flex-col gap-1">
          {dailyLog.foodsEaten.map((food, ind) => (
            <div className="flex" key={food.tempId}>
              <input
                type="text"
                value={food.name}
                onChange={(e) => onChange(ind, e)}
              />
              <button onClick={() => onClick(ind)} type="button">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </fieldset>
  );
};

export default FoodField;
