import API from "./api";

export const getInternships = () => API.get("/internships");

export const getSavedInternships = () => API.get("/internships/saved");

export const toggleSavedInternship = (internshipId) => API.post("/internships/save", { internshipId });

export const seedInternships = () => API.post("/internships/seed");
