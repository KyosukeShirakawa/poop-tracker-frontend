import axios from "axios";
import type { Food } from "../types/Food";

const BASE_URL=import.meta.env.VITE_BACKEND_URL;


export const getAllFoods = async () => {
  return axios.get<Food[]>(`${BASE_URL}/foods`).then(response => response.data)
}