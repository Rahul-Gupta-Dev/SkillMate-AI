import API from "./api";

export const askAI = (messages) => {
  return API.post("/ai/chat", {
    messages,
  });
};