import API from "./api";

export const createHabit = (data) => API.post("/habits", data);

export const getTodayHabit = () => API.get("/habits/today");

export const updateHabit = (data) => API.put("/habits/today", data);