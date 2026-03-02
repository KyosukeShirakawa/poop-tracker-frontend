import axios from "axios";
const BASE_URL=import.meta.env.VITE_BACKEND_URL;

export const getAllUsers = () => {
  console.log(BASE_URL)
  return axios.get(`${BASE_URL}/users`).then( (response) => response.data);
}