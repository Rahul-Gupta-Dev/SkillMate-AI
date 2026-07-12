import API from "./api";

export const generateStudyPlan = (data) => {
    return API.post("/study-plan/generate", data);
};