"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_controller_js_1 = require("../controllers/notes.controller.js");
const clerkAuth_js_1 = require("../middlewares/clerkAuth.js");
const requireAdmin_js_1 = require("../middlewares/requireAdmin.js");
const router = express_1.default.Router();
/* ---------------- FETCH NOTES ---------------- */
router.get("/get-notes", clerkAuth_js_1.clerkAuth, notes_controller_js_1.fetchNotes);
/* ---------------- UPLOAD NOTE ---------------- */
router.post("/upload", clerkAuth_js_1.clerkAuth, requireAdmin_js_1.requireAdmin, // 1️⃣ Verify token → sets req.user
notes_controller_js_1.upload, // 2️⃣ Multer parses multipart/form-data
notes_controller_js_1.uploadNote // 3️⃣ Controller logic
);
exports.default = router;
//# sourceMappingURL=notes.routes.js.map