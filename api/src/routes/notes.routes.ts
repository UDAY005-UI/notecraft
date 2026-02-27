import express from "express";
import {
  fetchNotes,
  uploadNote,
} from "../controllers/notes.controller.js";
import { clerkAuth } from "../middlewares/clerkAuth.js";
import { requireAdmin } from "../middlewares/requireAdmin.js";
import { upload } from "../middlewares/upload.js";

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
  requireAdmin,
  upload,
  uploadNote
);

export default router;