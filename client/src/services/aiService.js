import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/ai",
});

export const askAI = async (message) => {
  return API.post("/chat", { message });
};

export default API;