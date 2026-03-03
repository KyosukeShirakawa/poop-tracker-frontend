import axios from "axios";
const BASE_URL=import.meta.env.VITE_JSON_URL;

export const getAllUsers = () => {
  return axios.get(`${BASE_URL}/users`);
}