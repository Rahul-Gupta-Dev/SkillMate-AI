import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/study-plan",
});

export const generateStudyPlan = async (data) => {
    return API.post("/generate", data);
};

export default API;