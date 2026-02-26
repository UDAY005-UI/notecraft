"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_2 = require("@clerk/express");
const notes_routes_1 = __importDefault(require("./routes/notes.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5500;
/* ---------------- CORS ---------------- */
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
/* ---------------- BODY PARSER ---------------- */
app.use(express_1.default.json());
/* ---------------- REQUEST LOGGER ---------------- */
app.use((req, res, next) => {
    const start = Date.now();
    console.log("──────── UPLOAD DEBUG ────────");
    console.log("Auth:", req.user);
    console.log("Body fields:", req.body);
    console.log("File:", req.file);
    console.log("File size:", req.file?.size);
    console.log("──────────────────────────────");
    res.on("finish", () => {
        console.log("────────── RESPONSE END ──────────");
        console.log("Status:", res.statusCode);
        console.log("Duration:", `${Date.now() - start}ms`);
        console.log("──────────────────────────────────\n");
    });
    next();
});
/* ===========================
   🔐 CLERK MIDDLEWARE
   MUST BE BEFORE ROUTES
=========================== */
app.use((0, express_2.clerkMiddleware)());
/* ---------------- ROUTES ---------------- */
app.use("/users", users_routes_1.default);
app.use("/notes", notes_routes_1.default);
/* Static file serving */
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "src/uploads")));
/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map