import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import type { Food } from "../types/Food";
import { Navigate } from "react-router-dom";
import {
  addSafeFood,
  getSafeFoods,
  removeSafeFood,
} from "../services/user.service";
import type { FoodForm } from "../types/DailyLogDto";

const MyFoodPage = () => {
  const { user, safeFoods, setSafeFoods } = useContext(UserContext);
  const [newFood, setNewFood] = useState<FoodForm>({
    name: "",
    tempId: crypto.randomUUID(),
  });
  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {}, [newFood]);

  const handleOnChangeNewFood = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFood((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  const handleToggleRemove = async (food: Food) => {
    if (confirm(`Remove ${food.name} from the safe list?`)) {
      await removeSafeFood(user.id, String(food.id));
      setSafeFoods((prev) => prev.filter((f) => f.id !== food.id));
      console.log(safeFoods);
    }
  };

  const handleSubmitNewFood = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const response = await addSafeFood(user.id, newFood);
    setSafeFoods((prev) => [...prev, response]);
    setNewFood((prev) => ({
      name: "",
      tempId: crypto.randomUUID(),
    }));
  };

  return (
    <div className="main">
      <div className="page-title">
        <h2>Food list</h2>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {safeFoods.map((f) => (
              <tr key={f.id}>
                <td className="px-4 py-2">
                  <p className="text-lg ">{f.name}</p>
                </td>
                <td>
                  <button onClick={() => handleToggleRemove(f)}>remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={(e) => handleSubmitNewFood(e)}>
          <div className="flex flex-col gap-2">
            <input type="text" onChange={(e) => handleOnChangeNewFood(e)} />
            <button className="btn-lg" type="submit">
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyFoodPage;
