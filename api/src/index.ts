import express, { type Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { clerkMiddleware } from "@clerk/express";

import notesRoutes from "./routes/notes.routes";
import userRoutes from "./routes/users.routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5500;

/* ---------------- CORS ---------------- */

app.use(
  cors({
    origin: "https://notecraft-two.vercel.app",
    credentials: true,
  })
);

/* ---------------- BODY PARSER ---------------- */
app.use(express.json());

/* ---------------- REQUEST LOGGER ---------------- */
app.use((req, res, next) => {
  const start = Date.now();

console.log("──────── UPLOAD DEBUG ────────");
console.log("Auth:", req.user);
console.log("Body fields:", req.body);
console.log("File:", req.file);
console.log("File size:", req.file?.size);
console.log("──────────────────────────────");

  res.on("finish", () => {
    console.log("────────── RESPONSE END ──────────");
    console.log("Status:", res.statusCode);
    console.log("Duration:", `${Date.now() - start}ms`);
    console.log("──────────────────────────────────\n");
  });

  next();
});

/* ===========================
   🔐 CLERK MIDDLEWARE
   MUST BE BEFORE ROUTES
=========================== */
app.use(clerkMiddleware());

/* ---------------- ROUTES ---------------- */
app.use("/users", userRoutes);
app.use("/notes", notesRoutes);

/* Static file serving */
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src/uploads"))
);

/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

export default app;