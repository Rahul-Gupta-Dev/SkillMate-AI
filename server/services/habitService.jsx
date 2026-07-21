import axios from "axios";

const API = "http://localhost:5000/api/habits";

export const createHabit = async (habitData) => {

    const token = localStorage.getItem("token");

    return axios.post(API, habitData, {

        headers: {

            Authorization: `Bearer ${token}`,

        },

    });

};