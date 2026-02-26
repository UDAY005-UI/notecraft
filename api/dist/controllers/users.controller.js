"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const prisma_js_1 = require("../lib/prisma.js");
const express_1 = require("@clerk/express");
const createUser = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        // 1️⃣ Check if user already exists
        const existingUser = await prisma_js_1.prisma.user.findUnique({
            where: { clerkId: userId },
        });
        if (existingUser) {
            return res.status(200).json({
                message: "User already exists",
                user: existingUser,
            });
        }
        // 2️⃣ Fetch user from Clerk
        const clerkUser = await clerk_sdk_node_1.clerkClient.users.getUser(userId);
        const email = clerkUser.emailAddresses[0]?.emailAddress;
        const fullName = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
            clerkUser.username ||
            "User";
        const avatarUrl = clerkUser.imageUrl;
        if (!email) {
            return res.status(400).json({ message: "No primary email found" });
        }
        // 3️⃣ Create user according to YOUR schema
        const user = await prisma_js_1.prisma.user.create({
            data: {
                clerkId: userId,
                email,
                password: "CLERK_AUTH", // placeholder since password is required in schema
                fullName,
                avatarUrl,
                role: "USER",
            },
        });
        return res.status(201).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error creating user",
            error,
        });
    }
};
exports.createUser = createUser;
//# sourceMappingURL=users.controller.js.map