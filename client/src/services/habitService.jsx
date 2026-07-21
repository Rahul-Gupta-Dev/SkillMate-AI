import API from "./api";

export const createHabit = (data) => {
    return API.post("/habits", data);
};