import { useParams } from "react-router-dom";
import type { UserDto } from "../../types/UserDto";
import FoodList from "../../components/FoodList";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/user.service";

const User = () => {
  const id = useParams().id;
  const [user, setUser] = useState<UserDto>();
  if (!id) {
    return;
  }

  useEffect(() => {
    getUserById(id).then((response) => {
      setUser(response.data);
    });
  }, [user]);
  console.log(user);
  if (!user) {
    return;
  }

  return (
    <div className="content">
      <h2>{user.name}</h2>
      <div className="flex gap-16">
        <FoodList title="safe food list" foodlist={user.safeFoodList} />
        <FoodList title="avoid food list" foodlist={user.avoidFoodList} />
      </div>
    </div>
  );
};

export default User;
