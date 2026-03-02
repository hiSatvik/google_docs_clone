import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "SecretKEt";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("THis route got hit")
        console.log("Cookies:", req.cookies);
        console.log("Token:", req.cookies.token);


        if (!token) {
            return res.status(401).json({ message: "No token provided!" });
        }
        const decoded = jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                console.error("JWT verification error:", err);
                return res.status(401).json({
                    message: "Invalid token!"
                })
            }
            req.user = user;
            next();
        });

    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}