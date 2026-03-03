import type { Food } from "../types/Food";

type FoodListProps = {
  title: string;
  foodlist: Food[];
};

const FoodList = ({ title, foodlist }: FoodListProps) => {
  return (
    <div className="mb-4">
      <h4 className="text-xl font-bold">{title}</h4>
      <ul>
        {foodlist.map((f) => (
          <li className="list-disc" key={f.id}>
            {f.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
