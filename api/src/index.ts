import express, { type Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import fs from "fs";
import notesRoutes from "./routes/notes.routes";
import userRoutes from "./routes/users.routes";
import paymentRoutes from "./routes/payment.routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5500;

/* ---------------- CORS ---------------- */
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://notecraft-two.vercel.app",
      "https://notecrafts.in",
      "http://localhost:3000"
    ],
    credentials: true,
  })
);

/* ---------------- BODY PARSER ---------------- */

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

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Created uploads directory");
}

/* ---------------- ROUTES ---------------- */
app.use("/users", userRoutes);
app.use("/notes", notesRoutes);
app.use("/payment", paymentRoutes);

/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

export default app;