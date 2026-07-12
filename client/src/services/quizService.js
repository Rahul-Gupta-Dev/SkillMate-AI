import API from "./api";

export const generateQuiz = (data) => {
    return API.post("/quiz/generate", data);
};

export const submitQuiz = (quizId, data) => {
    return API.post(`/quiz/submit/${quizId}`, data);
};