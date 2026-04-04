import axios from "axios";
import type { CreateUserDto } from "../types/CreateUserDto";
import type { UserDto } from "../types/UserDto";
import type { Food } from "../types/Food";
import type { FoodForm } from "../types/DailyLogDto";
const BASE_URL=import.meta.env.VITE_BACKEND_URL;

export const getAllUsers = () => {
  return axios.get<UserDto[]>(`${BASE_URL}/users`);
}

export const getUserById = (id: string) => {
  return axios.get<UserDto>(`${BASE_URL}/users/${id}`).then( response => response.data)
}

export const createUser = (createUserDto : CreateUserDto) => {
  return axios.post<CreateUserDto>(`${BASE_URL}/users`, createUserDto);
}

export const getSafeFoods = async (userId: string) => {
  return axios.get<Food[]>(`${BASE_URL}/users/${userId}/safe-foods`).then(response => response.data)
}

export const addSafeFood = async(userId: string, food : FoodForm) => {

return axios.post<Food>(`${BASE_URL}/users/${userId}/safe-foods`, food).then(response => response.data)
}

export const removeSafeFood = async(userId: string, foodId: string)=> {
  return axios.delete<Food[]>(`${BASE_URL}/users/${userId}/safe-foods/${foodId}`).then(response => response.data);
};