import type { Food } from "./Food";
import type { PoopDTO } from "./PoopDto";

export type DailyLog = {
  id: number;
  date: string;
  poopDTO?: PoopDTO | null;
  foodsEaten?: Food[]
}