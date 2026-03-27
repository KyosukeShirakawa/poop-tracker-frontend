import { useContext } from "react";
import type { CreateDailyLogForm } from "../types/DailyLogDto";
import { createLog } from "../services/log.service";
import LogForm from "../components/LogForm";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const CreateLogPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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
      navigate(`/dashboard/${user.id}`);
    }
  };

  return (
    <div>
      <h2>Create Log</h2>
      <div>
        <LogForm
          initialData={{
            poopDTO: null,
            foodsEaten: [],
          }}
          onSubmit={handleSubmitForm}
        />
      </div>
    </div>
  );
};

export default CreateLogPage;
