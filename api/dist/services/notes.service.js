"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredNotes = getFilteredNotes;
exports.createNoteWithTag = createNoteWithTag;
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
    const academicTagFilter = {};
    if (normalizedUniversity) {
        academicTagFilter.university = {
            equals: normalizedUniversity,
            mode: "insensitive",
        };
    }
    if (normalizedDegree) {
        academicTagFilter.degree = {
            equals: normalizedDegree,
            mode: "insensitive",
        };
    }
    if (normalizedStream) {
        academicTagFilter.stream = {
            equals: normalizedStream,
            mode: "insensitive",
        };
    }
    if (parsedYear !== undefined) {
        academicTagFilter.year = parsedYear;
    }
    if (parsedSemester !== undefined) {
        academicTagFilter.semester = parsedSemester;
    }
    if (normalizedSubject) {
        academicTagFilter.subject = {
            equals: normalizedSubject,
            mode: "insensitive",
        };
    }
    const whereClause = {};
    if (Object.keys(academicTagFilter).length > 0) {
        whereClause.academicTag = {
            is: academicTagFilter,
        };
    }
    const notes = await prisma_js_1.prisma.note.findMany({
        where: whereClause,
        select: {
            id: true,
            title: true,
            price: true,
            fileUrl: true,
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
async function createNoteWithTag(data) {
    const { title, description, price, fileUrl, university, degree, stream, year, semester, subject, uploadedById, } = data;
    return prisma_js_1.prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
            where: { id: uploadedById },
        });
        if (!user) {
            throw new Error("User does not exist");
        }
        const academicTag = await tx.academicTag.upsert({
            where: {
                university_degree_stream_year_semester_subject: {
                    university,
                    degree,
                    stream,
                    year,
                    semester,
                    subject,
                },
            },
            update: {},
            create: {
                university,
                degree,
                stream,
                year,
                semester,
                subject,
            },
        });
        return tx.note.create({
            data: {
                title,
                description,
                price,
                fileUrl,
                academicTagId: academicTag.id,
                uploadedById: user.id,
            },
        });
    });
}
//# sourceMappingURL=notes.service.js.map