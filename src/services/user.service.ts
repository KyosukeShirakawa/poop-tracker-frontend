import axios from "axios";
import type { CreateUserDto } from "../types/CreateUserDto";
import type { UserDto } from "../types/UserDto";
const BASE_URL=import.meta.env.VITE_BACKEND_URL;

export const getAllUsers = () => {
  return axios.get<UserDto[]>(`${BASE_URL}/users`);
}

export const createUser = (createUserDto : CreateUserDto) => {
  return axios.post<CreateUserDto>(`${BASE_URL}/users`, createUserDto);
}