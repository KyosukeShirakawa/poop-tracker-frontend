import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import type { Food } from "../types/Food";
import { Navigate } from "react-router-dom";
import { getSafeFoods } from "../services/user.service";

const MyFoodPage = () => {
  const { user } = useContext(UserContext);
  const [foods, setFoods] = useState<Food[]>([]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchFoods = async () => {
      const fetchedFoods = await getSafeFoods(user.id);
      setFoods(fetchedFoods);
    };

    fetchFoods();
  }, [user, foods]);

  return (
    <div className="main">
      <div className="page-title">
        <h2>Food list</h2>
      </div>
      <div className="content">
        <div className="foodlist">
          <ul>
            {foods.map((f) => (
              <li key={f.id}>
                <div>{f.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyFoodPage;
