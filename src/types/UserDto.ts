import type { DailyLog } from "./DailyLogDto";
import type { Food } from "./Food";

export type UserDto = {
  id: string;
  name: string;
  logs: DailyLog[];
  safeFoodList: Food[];
  avoidFoodList: Food[];
}