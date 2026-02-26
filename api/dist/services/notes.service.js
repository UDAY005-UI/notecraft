"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredNotes = getFilteredNotes;
exports.createNote = createNote;
const prisma_js_1 = require("../lib/prisma.js");
async function getFilteredNotes(filters) {
    const { university, degree, stream, year, semester, subject, page, limit, } = filters;
    const normalizedUniversity = typeof university === "string" && university.trim() !== ""
        ? university.trim()
        : undefined;
    const normalizedDegree = typeof degree === "string" && degree.trim() !== ""
        ? degree.trim()
        : undefined;
    const normalizedStream = typeof stream === "string" && stream.trim() !== ""
        ? stream.trim()
        : undefined;
    const normalizedSubject = typeof subject === "string" && subject.trim() !== ""
        ? subject.trim()
        : undefined;
    const parsedYear = typeof year !== "undefined" && !isNaN(Number(year)) && Number(year) > 0
        ? Number(year)
        : undefined;
    const parsedSemester = typeof semester !== "undefined" &&
        !isNaN(Number(semester)) &&
        Number(semester) > 0
        ? Number(semester)
        : undefined;
    const parsedPage = !isNaN(Number(page)) && Number(page) > 0 ? Number(page) : 1;
    const parsedLimit = !isNaN(Number(limit)) && Number(limit) > 0
        ? Math.min(Number(limit), 50)
        : 10;
    const skip = (parsedPage - 1) * parsedLimit;
    const whereClause = {};
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
    const notes = await prisma_js_1.prisma.note.findMany({
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
async function createNote(data) {
    const { title, description, price, fileUrl, university, degree, stream, year, semester, subject, uploadedById, } = data;
    return prisma_js_1.prisma.$transaction(async (tx) => {
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
//# sourceMappingURL=notes.service.js.map