import axios from "axios";

type LoginPayload = {
  email: string;
  password: string;
};

export const authService = {
  login: async ({ email, password }: LoginPayload) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await axios.post(`${API_URL}/login`, { email, password });
    if (res.status !== 200) {
      throw new Error(res.data.message);
    }
    return res.data;
  },
};