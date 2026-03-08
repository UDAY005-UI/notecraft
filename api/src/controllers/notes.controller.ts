import { raw, type Request, type Response } from "express";
import cloudinary from "../lib/cloudinary.js";
import * as noteService from "../services/notes.service.js";
import { getFilteredNotes } from "../services/notes.service.js";
import { getAuth } from "@clerk/express";
import { prisma } from "../lib/prisma.js";
import fs from "fs";

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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
    });
  }
}

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
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const pdfFile = files?.file?.[0];

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!pdfFile) {
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

    let fileUrl: string | null = null;

    if (pdfFile) {
      const thumbUpload = await cloudinary.uploader.upload(
        pdfFile.path,
        {
          folder: "notes/pdfs",
          resource_type: "raw",
          format: "pdf",
        }
      );
      fileUrl = thumbUpload.secure_url;
      fs.unlinkSync(pdfFile.path);
    }

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
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Upload failed" });
  }
}

export const getMyPurchases = async (req: Request, res: Response) => {
  try {

    const { userId } = getAuth(req)

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const purchases = await prisma.purchase.findMany({
      where: {
        userId: user.id,
        paymentStatus: "SUCCESS"
      },
      include: {
        note: true
      }
    })

    const notes = purchases.map(p => p.note)

    return res.status(200).json({
      success: true,
      data: notes
    })

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      success: false,
      message: "Failed to fetch purchased notes"
    })

  }
}