import type { DailyLog } from "./DailyLogDto";
import type { Food } from "./Food";

export type UserDto = {
  id: number;
  name: string;
  logs: DailyLog[];
  safeFoodList: Food[];
  avoidFoodList: Food[];
}