import { useParams } from "react-router-dom";
import type { UserDto } from "../../types/UserDto";
import FoodList from "../../components/FoodList";
import { useState } from "react";

const User = () => {
  console.log("user page");
  const id = useParams().id;
  const [user, setUser] = useState<UserDto>({
    id: "1",
    name: "Kyo",
    logs: [
      {
        id: 1,
        date: "2026-02-21",
        poopDTO: {
          size: "BIG",
          color: "BROWN",
          softness: "NORMAL",
        },
        foodsEaten: [],
      },
      {
        id: 34,
        date: "2026-02-23",
        poopDTO: {
          size: "GINORMOUS",
          color: "DARK_BROWN",
          softness: "SOFT",
        },
        foodsEaten: [
          {
            id: 12,
            name: "chips",
          },
          {
            id: 1,
            name: "Banana",
          },
          {
            id: 11,
            name: "onion",
          },
          {
            id: 4,
            name: "chicken thigh",
          },
          {
            id: 9,
            name: "butter",
          },
        ],
      },
      {
        id: 37,
        date: "2026-02-24",
        poopDTO: null,
        foodsEaten: [],
      },
    ],
    safeFoodList: [
      {
        id: 1,
        name: "Banana",
      },
      {
        id: 10,
        name: "rice",
      },
      {
        id: 4,
        name: "chicken thigh",
      },
    ],
    avoidFoodList: [
      {
        id: 18,
        name: "sweet potatoes",
      },
      {
        id: 19,
        name: "almonds",
      },
    ],
  });
  console.log(user);
  if (!user) {
    return;
  }

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
