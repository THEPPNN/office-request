import axios from "axios";

const API_URL = "http://localhost:3000";

export const createUser = async (data: {
  name: string;
  email: string;
  role: "USER" | "MANAGER" | "ADMIN";
}) => {
  const res = await axios.post(`${API_URL}/users`, data);
  return res.data;
};