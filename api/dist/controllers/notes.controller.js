"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
exports.fetchNotes = fetchNotes;
exports.uploadNote = uploadNote;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const noteService = __importStar(require("../services/notes.service.js"));
const notes_service_js_1 = require("../services/notes.service.js");
const express_1 = require("@clerk/express");
const prisma_js_1 = require("../lib/prisma.js");
/* ---------------- FETCH NOTES ---------------- */
async function fetchNotes(req, res) {
    try {
        const filters = req.query;
        const notes = await (0, notes_service_js_1.getFilteredNotes)(filters);
        return res.status(200).json({
            success: true,
            data: notes,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch notes",
        });
    }
}
/* ---------------- MULTER CONFIG ---------------- */
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = (0, uuid_1.v4)() + path_1.default.extname(file.originalname);
        cb(null, uniqueName);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    }
    else {
        cb(new Error("Only PDF files are allowed"));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
}).single("file");
async function uploadNote(req, res) {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "PDF file required" });
        }
        const dbUser = await prisma_js_1.prisma.user.findUnique({
            where: { clerkId: userId },
        });
        if (!dbUser) {
            return res.status(404).json({ message: "User not found in database" });
        }
        const { title, description, price, university, degree, stream, year, semester, subject, } = req.body;
        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        const note = await noteService.createNote({
            title,
            description,
            price: Number(price),
            fileUrl,
            university,
            degree,
            stream,
            year: Number(year),
            semester: Number(semester),
            subject,
            uploadedById: dbUser.id,
        });
        return res.status(201).json({
            message: "PDF uploaded successfully",
            note,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Upload failed" });
    }
}
//# sourceMappingURL=notes.controller.js.map