import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/ai",
});

export const askAI = async (messages) => {
  return API.post("/chat", {
    messages,
  });
};

export default API;