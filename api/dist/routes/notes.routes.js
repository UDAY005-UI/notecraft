"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_controller_1 = require("../controllers/notes.controller");
const clerkAuth_js_1 = require("../middlewares/clerkAuth.js");
const router = express_1.default.Router();
router.get('/get-notes', clerkAuth_js_1.clerkAuth, (req, res) => {
    res.json({
        message: "Access granted",
        clerkUserId: req.user.sub,
    });
}, notes_controller_1.fetchNotes);
router.post("/upload", clerkAuth_js_1.clerkAuth, (req, res) => {
    res.json({
        message: "Access granted",
        clerkUserId: req.user.sub,
    });
}, notes_controller_1.upload, notes_controller_1.uploadNote);
exports.default = router;
//# sourceMappingURL=notes.routes.js.map