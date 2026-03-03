import axios from "axios";
import type { CreateUserDto, UserDto } from "../types/CreateUserDto";
const BASE_URL=import.meta.env.VITE_JSON_URL;

export const getAllUsers = async () => {
  return await axios.get(`${BASE_URL}/users`);
}

export const createUser = async (createUserDto : CreateUserDto): Promise<UserDto> => {
  return await axios.post(`${BASE_URL}/users`, createUserDto);
}