"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clerkAuth = clerkAuth;
const backend_1 = require("@clerk/backend");
async function clerkAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Malformed authorization header" });
        return;
    }
    try {
        const payload = await (0, backend_1.verifyToken)(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
        });
        req.user = payload;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
//# sourceMappingURL=clerkAuth.js.map