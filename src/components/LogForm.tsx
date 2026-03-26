import { useContext, useEffect, useState } from "react";
import type { CreateDailyLogForm } from "../types/DailyLogDto";
import { ColorEnum, SizeEnum, SoftnessEnum } from "../types/PoopDto";

interface LogFormProps {
  initialData: CreateDailyLogForm;
  onSubmit: (data: CreateDailyLogForm) => void;
}

const LogForm = ({ initialData, onSubmit }: LogFormProps) => {
  const [dailyLog, setDailyLog] = useState<CreateDailyLogForm>(initialData);
  console.log(dailyLog);

  useEffect(() => {
    setDailyLog(initialData);
  }, [initialData]);

  const handleOnChangeFood = (ind: number, e) => {
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
      },
    });

    console.log(dailyLog);
  };
  const handleAddFood = () => {
    setDailyLog({ ...dailyLog, foodsEaten: [...dailyLog.foodsEaten, ""] });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(dailyLog);
      }}
    >
      <fieldset>
        <legend>Poop</legend>
        <label>Poop</label>
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
      </fieldset>
      <fieldset>
        <legend>Foods you ate</legend>
        {dailyLog.foodsEaten.map((food, ind) => (
          <input
            key={ind}
            type="text"
            value={food}
            onChange={(e) => handleOnChangeFood(ind, e)}
          />
        ))}
      </fieldset>
      <button type="button" onClick={() => handleAddFood()}>
        Add Food
      </button>

      <button type="submit">submit</button>
    </form>
  );
};

export default LogForm;
