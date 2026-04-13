import { useContext } from "react";
import type { CreateDailyLogForm, FoodForm } from "../types/DailyLogDto";
import { type PoopDTO } from "../types/PoopDto";
import PoopField from "./PoopField";
import FoodField from "./FoodField";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { addSafeFood, removeSafeFood } from "../services/user.service";

interface LogFormProps {
  dailyLog: CreateDailyLogForm;
  onChange: React.Dispatch<React.SetStateAction<CreateDailyLogForm>>;
  onSubmit: (data: CreateDailyLogForm) => void;
}

const LogForm = ({ dailyLog, onChange, onSubmit }: LogFormProps) => {
  const { user, safeFoods, setSafeFoods } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleOnChangeFood = (
    ind: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedFoods = [...dailyLog.foodsEaten];
    updatedFoods[ind].name = e.target.value;
    onChange((prev) => ({
      ...prev,
      foodsEaten: updatedFoods,
    }));
  };
  const handleOnChangePoop = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    onChange((prev) => ({
      ...prev,
      poopDTO: {
        ...dailyLog.poopDTO,
        [name]: value,
      } as PoopDTO,
    }));
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
    onChange((prev) => ({
      ...prev,
      foodsEaten: newFoodsEaten,
    }));
  };
  const handleToggleSafe = async (food: FoodForm) => {
    const isSafe = safeFoods.some((f) => f.name === food.name);

    if (isSafe) {
      await removeSafeFood(user.id, String(food.id));
      setSafeFoods((prev) => prev.filter((f) => f.id !== food.id));
      console.log(safeFoods);
    } else {
      const newFood = await addSafeFood(user.id, food);
      setSafeFoods((prev) => [...prev, newFood]);
      console.log(safeFoods);
    }
  };
  return (
    <form
      className="log-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(dailyLog);
      }}
    >
      <PoopField
        poopDTO={dailyLog.poopDTO}
        onClick={handleClickSetPoop}
        onChange={handleOnChangePoop}
      />

      <FoodField
        foodsEaten={dailyLog.foodsEaten}
        onChange={handleOnChangeFood}
        onClickRemove={handleClickRemove}
        onToggleSafe={handleToggleSafe}
      />
      <div className="flex flex-col gap-2">
        <button
          className="btn-lg"
          type="button"
          onClick={() => handleAddFood()}
        >
          Add Food
        </button>
        <button className="btn-lg" type="submit">
          submit
        </button>
      </div>
    </form>
  );
};

export default LogForm;
