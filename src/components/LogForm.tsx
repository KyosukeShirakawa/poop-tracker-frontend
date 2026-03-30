import { useEffect } from "react";
import type { CreateDailyLogForm } from "../types/DailyLogDto";
import { type PoopDTO } from "../types/PoopDto";
import PoopField from "./PoopField";
import FoodField from "./FoodField";

interface LogFormProps {
  dailyLog: CreateDailyLogForm;
  onChange: React.Dispatch<React.SetStateAction<CreateDailyLogForm | null>>;
  onSubmit: (data: CreateDailyLogForm) => void;
}

const LogForm = ({ dailyLog, onChange, onSubmit }: LogFormProps) => {
  useEffect(() => {
    onChange(dailyLog);
  }, [dailyLog]);

  const handleOnChangeFood = (
    ind: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedFoods = [...dailyLog.foodsEaten];
    updatedFoods[ind].name = e.target.value;
    onChange({ ...dailyLog, foodsEaten: updatedFoods });
  };
  const handleOnChangePoop = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    onChange({
      ...dailyLog,
      poopDTO: {
        ...dailyLog.poopDTO,
        [name]: value,
      } as PoopDTO,
    });
  };
  const handleAddFood = () => {
    onChange((prev) => ({
      ...prev,
      foodsEaten: [
        ...prev.foodsEaten,
        { tempId: crypto.randomUUID(), name: "" },
      ],
    }));
  };

  const handleClickSetPoop = () => {
    if (dailyLog.poopDTO !== null) {
      onChange((prev) => ({
        ...prev,
        poopDTO: null,
      }));
    } else {
      onChange((prev) => ({
        ...prev,
        poopDTO: {
          size: "NORMAL",
          color: "BROWN",
          softness: "NORMAL",
        },
      }));
    }
  };

  const handleClickRemove = (ind: number) => {
    const newFoodsEaten = dailyLog.foodsEaten.filter((f, i) => i !== ind);
    console.log(newFoodsEaten);
    onChange((prev) => ({ ...prev, foodsEaten: newFoodsEaten }));
    console.log("after removing a food" + dailyLog);
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
        {dailyLog.poopDTO ? "unset poop" : "set poop"}
      </button>
      {dailyLog.poopDTO ? (
        <PoopField dailyLog={dailyLog} onChange={handleOnChangePoop} />
      ) : (
        <div>You haven't pooped yet</div>
      )}
      <FoodField
        dailyLog={dailyLog}
        onChange={handleOnChangeFood}
        onClick={handleClickRemove}
      />
      <div className="flex gap-2">
        <button type="button" onClick={() => handleAddFood()}>
          Add Food
        </button>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};

export default LogForm;
