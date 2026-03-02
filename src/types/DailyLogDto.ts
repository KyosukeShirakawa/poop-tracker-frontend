import type { Food } from "./Food";
import type { Poop } from "./PoopDto";

export type DailyLog = {
  id: number;
  date: string;
  poop: Poop;
  foodsEaten: Food[]
}