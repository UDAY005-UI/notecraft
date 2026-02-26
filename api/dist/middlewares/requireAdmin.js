"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = requireAdmin;
const prisma_js_1 = require("../lib/prisma.js");
async function requireAdmin(req, res, next) {
    try {
        // 1. Ensure user is authenticated
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const clerkId = req.user.sub; // Clerk user ID
        if (!clerkId) {
            res.status(401).json({ message: "Invalid token payload" });
            return;
        }
        // 2. Fetch user from DB
        const user = await prisma_js_1.prisma.user.findUnique({
            where: { clerkId },
        });
        if (!user) {
            res.status(404).json({ message: "User not found in database" });
            return;
        }
        // 3. Check role
        if (user.role !== "ADMIN") {
            res.status(403).json({ message: "Access denied. Admins only." });
            return;
        }
        // 4. Attach DB user if needed
        req.user = {
            ...req.user,
            dbUserId: user.id,
            role: user.role,
        };
        next();
    }
    catch (error) {
        console.error("Admin authorization error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
//# sourceMappingURL=requireAdmin.js.map