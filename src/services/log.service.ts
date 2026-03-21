import axios from "axios";
import type { UserDto } from "../types/UserDto";
import type { DailyLog } from "../types/DailyLogDto";
const BASE_URL=import.meta.env.VITE_BACKEND_URL;

export const getLogByDate = async (userId: string, date: string) => {
  return axios.get<DailyLog>(`${BASE_URL}/users/${userId}/logs/${date}`).then(response => response.data);
}

export const getLogsByUserId = async (userId: string) => {
  return axios.get<DailyLog[]>(`${BASE_URL}/users/${userId}/logs`).then(response => response.data);
}
export const getUserById = (id: string) => {
  return axios.get<UserDto>(`${BASE_URL}/users/${id}`)
}