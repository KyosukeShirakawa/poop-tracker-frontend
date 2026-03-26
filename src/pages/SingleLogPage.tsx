import { Navigate, useParams } from "react-router-dom";
import type { CreateDailyLogForm, DailyLog } from "../types/DailyLogDto";
import { useContext, useEffect, useState } from "react";
import { getLogByDate } from "../services/log.service";
import { UserContext } from "../context/UserContext";
import { ColorEnum, SizeEnum, SoftnessEnum } from "../types/PoopDto";

const SingleLogPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [log, setLog] = useState<CreateDailyLogForm | null>(null);
  const [logId, setLogId] = useState<number | null>(null);
  const [logDate, setLogDate] = useState<string>("");

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!id) {
    return <Navigate to={`/dashboard/${user.id}`} />;
  }

  useEffect(() => {
    const fetchLog = async () => {
      const data = await getLogByDate(user.id, id);
      setLogId(data.id);
      setLogDate(data.date);
      setLog({
        poopDTO: data.poopDTO,
        foodsEaten: data.foodsEaten.map((f) => f.name),
      });
    };
    fetchLog();
  }, [user, id]);

  if (!log) {
    return <div>loading....</div>;
  }

  const handleOnChangeFood = (ind: number, e) => {
    const updatedFoods = [...log.foodsEaten];
    updatedFoods[ind] = e.target.value;
    setLog({ ...log, foodsEaten: updatedFoods });
  };
  const handleSubmitForm = () => {};
  return (
    <div>
      <h2>{logDate}</h2>
      <form onSubmit={handleSubmitForm}>
        <fieldset>
          <legend>Poop</legend>
          <label>Poop</label>
          <select name="size" id="">
            {Object.entries(SizeEnum).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select name="color" id="">
            {Object.entries(ColorEnum).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select name="softness" id="">
            {Object.entries(SoftnessEnum).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <legend>Foods you ate</legend>
          {log.foodsEaten.map((food, ind) => (
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
  );
};

export default SingleLogPage;
