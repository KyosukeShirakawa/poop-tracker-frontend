import { useContext } from "react";
import type { FoodForm } from "../types/DailyLogDto";
import { UserContext } from "../context/UserContext";

interface FoodFieldProps {
  foodsEaten: FoodForm[];
  onChange: (ind: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickRemove: (ind: number) => void;
  onToggleSafe: (food: FoodForm) => void;
}

const FoodField = ({
  foodsEaten,
  onChange,
  onClickRemove,
  onToggleSafe,
}: FoodFieldProps) => {
  const { safeFoods } = useContext(UserContext);
  return (
    <fieldset>
      <div className="flex flex-col items-center gap-6">
        <legend className="text-xl font-semibold">Foods you ate</legend>
        <div className="flex flex-col gap-2">
          {foodsEaten.map((food, ind) => (
            <div className="flex" key={food.tempId}>
              <input
                type="text"
                value={food.name}
                onChange={(e) => onChange(ind, e)}
              />
              <div className="flex gap-2">
                <button
                  className="btn-sm"
                  onClick={() => onClickRemove(ind)}
                  type="button"
                >
                  Remove
                </button>
                {safeFoods.find((f) => f.name === food.name) ? (
                  <button
                    className="btn-sm bg-red-500 text-white"
                    onClick={() => onToggleSafe(food)}
                    type="button"
                  >
                    - unsafe
                  </button>
                ) : (
                  <button
                    className="btn-sm bg-green-500 text-white"
                    onClick={() => onToggleSafe(food)}
                    type="button"
                  >
                    + safe
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </fieldset>
  );
};

export default FoodField;
