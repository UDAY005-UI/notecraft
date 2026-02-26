/*
  Warnings:

  - You are about to drop the column `academicTagId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `AcademicTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `degree` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stream` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_academicTagId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_uploadedById_fkey";

-- DropIndex
DROP INDEX "Note_academicTagId_idx";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "academicTagId",
ADD COLUMN     "degree" TEXT NOT NULL,
ADD COLUMN     "semester" INTEGER NOT NULL,
ADD COLUMN     "stream" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "university" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AcademicTag";

-- CreateIndex
CREATE INDEX "Note_uploadedById_idx" ON "Note"("uploadedById");

-- CreateIndex
CREATE INDEX "Note_university_idx" ON "Note"("university");

-- CreateIndex
CREATE INDEX "Note_degree_idx" ON "Note"("degree");

-- CreateIndex
CREATE INDEX "Note_stream_idx" ON "Note"("stream");

-- CreateIndex
CREATE INDEX "Note_year_idx" ON "Note"("year");

-- CreateIndex
CREATE INDEX "Note_semester_idx" ON "Note"("semester");

-- CreateIndex
CREATE INDEX "Note_subject_idx" ON "Note"("subject");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
