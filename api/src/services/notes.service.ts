import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client";

type NoteFilters = {
  university?: unknown;
  degree?: unknown;
  stream?: unknown;
  year?: unknown;
  semester?: unknown;
  subject?: unknown;
  page?: unknown;
  limit?: unknown;
};

export async function getFilteredNotes(filters: NoteFilters) {
  const {
    university,
    degree,
    stream,
    year,
    semester,
    subject,
    page,
    limit,
  } = filters;

  const normalizedUniversity =
    typeof university === "string" && university.trim() !== ""
      ? university.trim()
      : undefined;

  const normalizedDegree =
    typeof degree === "string" && degree.trim() !== ""
      ? degree.trim()
      : undefined;

  const normalizedStream =
    typeof stream === "string" && stream.trim() !== ""
      ? stream.trim()
      : undefined;

  const normalizedSubject =
    typeof subject === "string" && subject.trim() !== ""
      ? subject.trim()
      : undefined;

  const parsedYear =
    typeof year !== "undefined" && !isNaN(Number(year)) && Number(year) > 0
      ? Number(year)
      : undefined;

  const parsedSemester =
    typeof semester !== "undefined" &&
    !isNaN(Number(semester)) &&
    Number(semester) > 0
      ? Number(semester)
      : undefined;

  const parsedPage =
    !isNaN(Number(page)) && Number(page) > 0 ? Number(page) : 1;

  const parsedLimit =
    !isNaN(Number(limit)) && Number(limit) > 0
      ? Math.min(Number(limit), 50)
      : 10;

  const skip = (parsedPage - 1) * parsedLimit;

  const whereClause: Prisma.NoteWhereInput = {};

  if (normalizedUniversity) {
    whereClause.university = {
      equals: normalizedUniversity,
      mode: "insensitive",
    };
  }

  if (normalizedDegree) {
    whereClause.degree = {
      equals: normalizedDegree,
      mode: "insensitive",
    };
  }

  if (normalizedStream) {
    whereClause.stream = {
      equals: normalizedStream,
      mode: "insensitive",
    };
  }

  if (parsedYear !== undefined) {
    whereClause.year = parsedYear;
  }

  if (parsedSemester !== undefined) {
    whereClause.semester = parsedSemester;
  }

  if (normalizedSubject) {
    whereClause.subject = {
      equals: normalizedSubject,
      mode: "insensitive",
    };
  }

  const notes = await prisma.note.findMany({
    where: whereClause,
    select: {
      id: true,
      title: true,
      price: true,
      fileUrl: true,
      university: true,
      degree: true,
      stream: true,
      year: true,
      semester: true,
      subject: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: parsedLimit,
  });

  return notes;
}

interface CreateNoteInput {
  title: string;
  description?: string;
  price: number;
  fileUrl: string;

  university: string;
  degree: string;
  stream: string;
  year: number;
  semester: number;
  subject: string;

  uploadedById: string;
}

export async function createNote(data: CreateNoteInput) {
  const {
    title,
    description,
    price,
    fileUrl,
    university,
    degree,
    stream,
    year,
    semester,
    subject,
    uploadedById,
  } = data;

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: uploadedById },
    });

    if (!user) {
      throw new Error("User does not exist");
    }

    return tx.note.create({
      data: {
        title,
        description,
        price,
        fileUrl,
        university,
        degree,
        stream,
        year,
        semester,
        subject,
        uploadedById: user.id,
      },
    });
  });
}