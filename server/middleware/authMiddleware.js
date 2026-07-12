import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        try {

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log("Decoded Token:", decoded);

            req.user = {
                id: decoded.id,
            };

            console.log("req.user =", req.user);

            next();

        } catch (error) {

            console.error(error);

            return res.status(401).json({
                success: false,
                message: "Invalid Token",
            });

        }

    } else {

        return res.status(401).json({
            success: false,
            message: "No Token Found",
        });

    }
};

export default protect;