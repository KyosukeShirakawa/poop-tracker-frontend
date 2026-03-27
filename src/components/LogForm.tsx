import { useEffect, useState } from "react";
import type { CreateDailyLogForm } from "../types/DailyLogDto";
import {
  ColorEnum,
  SizeEnum,
  SoftnessEnum,
  type PoopDTO,
} from "../types/PoopDto";

interface LogFormProps {
  initialData: CreateDailyLogForm;
  onSubmit: (data: CreateDailyLogForm) => void;
}

const LogForm = ({ initialData, onSubmit }: LogFormProps) => {
  const [dailyLog, setDailyLog] = useState<CreateDailyLogForm>(initialData);

  useEffect(() => {
    setDailyLog(initialData);
  }, [initialData]);

  const handleOnChangeFood = (
    ind: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedFoods = [...dailyLog.foodsEaten];
    updatedFoods[ind] = e.target.value;
    setDailyLog({ ...dailyLog, foodsEaten: updatedFoods });
  };
  const handleOnChangePoop = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setDailyLog({
      ...dailyLog,
      poopDTO: {
        ...dailyLog.poopDTO,
        [name]: value,
      } as PoopDTO,
    });
  };
  const handleAddFood = () => {
    setDailyLog({ ...dailyLog, foodsEaten: [...dailyLog.foodsEaten, ""] });
  };

  const handleClickSetPoop = () => {
    if (dailyLog.poopDTO !== null) {
      setDailyLog((prev) => ({
        ...prev,
        poopDTO: null,
      }));
    } else {
      setDailyLog((prev) => ({
        ...prev,
        poopDTO: {
          size: "NORMAL",
          color: "BROWN",
          softness: "NORMAL",
        },
      }));
    }
  };
  return (
    <form
      className="flex flex-col items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(dailyLog);
      }}
    >
      <button type="button" onClick={handleClickSetPoop}>
        Set Poop
      </button>{" "}
      {dailyLog.poopDTO ? (
        <fieldset>
          <div className="flex flex-col items-center gap-2">
            <legend>How was your poop?</legend>
            <div>
              <label>Size</label>
              <select
                name="size"
                value={dailyLog.poopDTO?.size}
                onChange={handleOnChangePoop}
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
                onChange={handleOnChangePoop}
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
                onChange={handleOnChangePoop}
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
      ) : (
        <div>You haven't pooped yet</div>
      )}
      <fieldset>
        <div className="flex flex-col items-center gap-2">
          <legend>Foods you ate</legend>
          <div className="flex gap-2">
            {dailyLog.foodsEaten.map((food, ind) => (
              <input
                key={ind}
                type="text"
                value={food}
                onChange={(e) => handleOnChangeFood(ind, e)}
              />
            ))}
          </div>
        </div>
      </fieldset>
      <button type="button" onClick={() => handleAddFood()}>
        Add Food
      </button>
      <button type="submit">submit</button>
    </form>
  );
};

export default LogForm;
