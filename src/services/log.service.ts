import axios from "axios";
import type { UserDto } from "../types/UserDto";
const BASE_URL=import.meta.env.VITE_BACKEND_URL;

const getLogById = (userId: string, logId: string) => {
  return axios.get<UserDto[]>(`${BASE_URL}/users/${userId}/logs/${logId}`);
}
export const getUserById = (id: string) => {
  return axios.get<UserDto>(`${BASE_URL}/users/${id}`)
}