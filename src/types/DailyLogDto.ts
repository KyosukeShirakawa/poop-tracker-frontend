import type { Food } from "./Food";
import type { PoopDTO } from "./PoopDto";

export type DailyLog = {
  id: number;
  date: string;
  poopDTO?: PoopDTO;
  foodsEaten?: Food[]
}

export type FoodForm = {
  tempId: string;
  id?: number;
  name: string;
}

export interface CreateDailyLogForm {
  poopDTO: PoopDTO | null;
  foodsEaten: FoodForm[];
}

export interface CreateDailyLogRequest extends CreateDailyLogForm {
  date: string;
}