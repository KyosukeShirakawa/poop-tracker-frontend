import type { UserDto } from "../types/UserDto";
import FoodList from "./FoodList";

interface UserProps {
  user: UserDto;
}

const User = ({ user }: UserProps) => {
  return (
    <div className="mb-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <div className="flex gap-16">
        <FoodList title="safe food list" foodlist={user.safeFoodList} />
        <FoodList title="avoid food list" foodlist={user.avoidFoodList} />
      </div>
    </div>
  );
};

export default User;
