import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/auth",
});

export const registerUser = async (userData) => {
    return API.post("/register", userData);
};

export const loginUser = async (userData) => {
    return API.post("/login", userData);
};

export default API;