import express from "express";
import {
  fetchNotes,
  getMyPurchases,
  uploadNote,
  updateNote,
  deleteNote
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


router.get("/my-purchases", clerkAuth, getMyPurchases);

/* ---------------- UPLOAD NOTE ---------------- */

router.post(
  "/upload",
  clerkAuth,
  requireAdmin,
  upload.fields([
    {name: "file", maxCount: 1}
  ]),
  uploadNote
);

router.put(
  "/update/:id",
  clerkAuth,
  requireAdmin,
  upload.fields([
    {name: "file", maxCount: 1}
  ]),
  updateNote
);

router.delete(
  "/delete/:id",
  clerkAuth,
  requireAdmin,
  deleteNote
);

export default router;