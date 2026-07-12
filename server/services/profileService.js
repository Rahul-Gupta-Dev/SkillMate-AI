import API from "./api";

export const getProfile = () => {
    return API.get("/profile");
};