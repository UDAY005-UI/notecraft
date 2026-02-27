import type { Request, Response, RequestHandler } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../lib/cloudinary.js";
import * as noteService from "../services/notes.service.js";
import { getFilteredNotes } from "../services/notes.service.js";
import { getAuth } from "@clerk/express";
import { prisma } from "../lib/prisma.js";

/* ---------------- FETCH NOTES ---------------- */

export async function fetchNotes(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const filters = req.query;
    const notes = await getFilteredNotes(filters);

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
    });
  }
}

/* ---------------- MULTER CLOUDINARY CONFIG ---------------- */

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "notes-pdfs",
    resource_type: "raw", // required for PDFs
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

export const upload: RequestHandler = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("file");

/* ---------------- UPLOAD NOTE ---------------- */

interface UploadNoteBody {
  title: string;
  description?: string;
  price: string;
  university: string;
  degree: string;
  stream: string;
  year: string;
  semester: string;
  subject: string;
}

export async function uploadNote(
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  req: Request<{}, {}, UploadNoteBody>,
  res: Response
) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "PDF file required" });
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    const {
      title,
      description,
      price,
      university,
      degree,
      stream,
      year,
      semester,
      subject,
    } = req.body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Upload failed" });
  }
}