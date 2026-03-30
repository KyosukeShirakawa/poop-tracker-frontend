import axios from "axios";
import type { UserDto } from "../types/UserDto";
import type { CreateDailyLogForm, DailyLog, FoodForm } from "../types/DailyLogDto";
import type { Food } from "../types/Food";
const BASE_URL=import.meta.env.VITE_BACKEND_URL;

export const getLogByDate = async (userId: string, date: string) => {
  return axios.get<DailyLog>(`${BASE_URL}/users/${userId}/logs/${date}`)
    .then(response => {
      const data = response.data;

      return {
        ...data,
        foodsEaten: data.foodsEaten && mapToFoodForm(data.foodsEaten)
      }
    });
}

export const getLogsByUserId = async (userId: string) => {
  return axios.get<DailyLog[]>(`${BASE_URL}/users/${userId}/logs`).then(response => response.data
  );
}
export const getUserById = (id: string) => {
  return axios.get<UserDto>(`${BASE_URL}/users/${id}`)
}

export const createLog = (userId: string, dailyLog: CreateDailyLogForm) => {
  return axios.post<DailyLog>(`${BASE_URL}/users/${userId}/logs`, dailyLog).then(response => response.data);
}

export const updateLog = (userId: string, logId: string, dailyLog: CreateDailyLogForm) => {
  return axios.put<DailyLog>(`${BASE_URL}/users/${userId}/logs/${logId}`, dailyLog).then(response => response.data);
}

export const deleteLog = (userId: string,  logId: string) => {
  return axios.delete<string>(`${BASE_URL}/users/${userId}/logs/${logId}`).then(response => response.data)
}

const mapToFoodDTO = (foods: FoodForm[]) =>
  foods.map(({ id, name }) => ({ id, name }));

const mapToFoodForm = (foods: Food[]) => 
  foods.map((f) => ({tempId: crypto.randomUUID(), id: f.id, name: f.name}))
