import API from "./api";

export const createHabit = (data) => {
    return API.post("/habits", data);
};

export const getTodayHabit = () => {
    return API.get("/habits/today");
};

export const updateHabit = (data) => {
    return API.put("/habits/today", data);
};
