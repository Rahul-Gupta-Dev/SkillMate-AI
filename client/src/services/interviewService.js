import API from "./api";

export const generateInterview = (data) => {
    return API.post("/interview/generate", data);
};

export const evaluateInterviewAnswer = (data) => {
    return API.post("/interview/evaluate", data);
};

export const getInterviewSummary = () => {
    return API.get("/interview/summary");
};

export const getInterviewHistory = () => {
    return API.get("/interview/history");
};

export const getInterviewById = (id) => {
    return API.get(`/interview/${id}`);
};
