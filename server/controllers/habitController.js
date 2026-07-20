import Habit from "../models/Habit.js";

export const createHabit = async (req, res) => {
    try {
        res.status(201).json({
            success: true,
            message: "Habit API Working"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getHabits = async (req, res) => {
    res.json([]);
};

export const getTodayHabit = async (req, res) => {
    res.json({});
};

export const analyzeHabit = async (req, res) => {
    res.json({
        message: "AI Analysis Coming Soon"
    });
};

export const deleteHabit = async (req, res) => {
    res.json({
        message: "Habit Deleted"
    });
};