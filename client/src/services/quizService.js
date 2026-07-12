import API from "./api";

export const generateQuiz = (data) => {
    return API.post("/quiz/generate", data);
};