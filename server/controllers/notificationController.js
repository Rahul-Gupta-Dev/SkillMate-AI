import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });

        res.json({
            success: true,
            notifications,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const createNotification = async ({ userId, title, message, type = "system", link = "", action = "" }) => {
    return Notification.create({
        userId,
        title,
        message,
        type,
        link,
        action,
    });
};

export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findOne({ _id: id, userId: req.user.id });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found.",
            });
        }

        notification.read = true;
        await notification.save();

        res.json({
            success: true,
            notification,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { userId: req.user.id },
            { $set: { read: true } }
        );

        const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });

        res.json({
            success: true,
            notifications,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const createSampleNotification = async (req, res) => {
    try {
        const userId = req.user.id;

        const sample = [
            {
                title: "New internship match",
                message: "A React internship matching your profile has been added to the system.",
                type: "internship",
                link: "/internships",
                action: "View opportunities",
            },
            {
                title: "Interview reminder",
                message: "Your interview prep streak is active. Try one more mock round today.",
                type: "interview",
                link: "/interview",
                action: "Practice now",
            },
            {
                title: "Study reminder",
                message: "Your study plan reminder is due. Keep your learning streak alive.",
                type: "study",
                link: "/study-plan",
                action: "Open plan",
            },
        ];

        const created = await Promise.all(
            sample.map((item) => createNotification({ userId, ...item }))
        );

        res.status(201).json({
            success: true,
            notifications: created,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
