import { useContext, useEffect, useState } from "react";
import type { CreateDailyLogForm } from "../types/DailyLogDto";
import type { Food } from "../types/Food";
import { getAllFoods } from "../services/food.service";
import { createLog } from "../services/log.service";
import LogForm from "../components/LogForm";
import { UserContext } from "../context/UserContext";

const CreateLogPage = () => {
  const { user } = useContext(UserContext);

  // const [allFoods, setAllFoods] = useState<Food[]>([]);

  // useEffect(() => {
  //   const fetchFoods = async () => {
  //     const data = await getAllFoods();
  //     setAllFoods(data);
  //   };
  //   fetchFoods();
  // }, []);

  const handleSubmitForm = async (dailyLog: CreateDailyLogForm) => {
    if (user?.id) {
      const createdLog = await createLog(user.id, dailyLog);
      console.log(createdLog);
    }
  };

  return (
    <div>
      <h2>Create Log</h2>
      <div>
        <LogForm
          initialData={{
            poopDTO: { size: "NORMAL", color: "BROWN", softness: "NORMAL" },
            foodsEaten: [],
          }}
          onSubmit={handleSubmitForm}
        />
      </div>
    </div>
  );
};

export default CreateLogPage;
