import { useContext, useEffect, useState } from "react";
import { ColorEnum, SizeEnum, SoftnessEnum } from "../types/PoopDto";
import type { CreateDailyLogForm } from "../types/DailyLogDto";
import type { Food } from "../types/Food";
import { getAllFoods } from "../services/food.service";
import { createLog } from "../services/log.service";
import { UserContext } from "../context/UserContext";

const CreateLogPage = () => {
  const { user } = useContext(UserContext);
  const [dailyLog, setDailyLog] = useState<CreateDailyLogForm>({
    poopDTO: null,
    foodsEaten: [],
  });
  const [allFoods, setAllFoods] = useState<Food[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const data = await getAllFoods();
      setAllFoods(data);
    };
    fetchFoods();
  }, []);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user?.id) {
      const createdLog = await createLog(user.id, dailyLog);
      console.log(createdLog);
    }
  };

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
  };
  const handleAddFood = () => {
    setDailyLog({ ...dailyLog, foodsEaten: [...dailyLog.foodsEaten, ""] });
  };
  return (
    <div>
      <h2>Create Log</h2>
      <div>
        <form onSubmit={handleSubmitForm}>
          <fieldset>
            <legend>Poop</legend>
            <label>Poop</label>
            <select name="size" id="" onChange={(e) => handleOnChangePoop(e)}>
              {Object.entries(SizeEnum).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select name="color" id="" onChange={(e) => handleOnChangePoop(e)}>
              {Object.entries(ColorEnum).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select
              name="softness"
              id=""
              onChange={(e) => handleOnChangePoop(e)}
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
      </div>
    </div>
  );
};

export default CreateLogPage;
