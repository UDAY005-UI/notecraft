import express from "express";
import {
  fetchNotes,
  upload,
  uploadNote,
} from "../controllers/notes.controller.js";
import { clerkAuth } from "../middlewares/clerkAuth.js";
import { requireAdmin } from "../middlewares/requireAdmin.js";

const router = express.Router();

/* ---------------- FETCH NOTES ---------------- */

router.get(
  "/get-notes",
  clerkAuth,
  fetchNotes
);

/* ---------------- UPLOAD NOTE ---------------- */

router.post(
  "/upload",
  clerkAuth, 
  requireAdmin,  // 1️⃣ Verify token → sets req.user
  upload,      // 2️⃣ Multer parses multipart/form-data
  uploadNote   // 3️⃣ Controller logic
);

export default router;