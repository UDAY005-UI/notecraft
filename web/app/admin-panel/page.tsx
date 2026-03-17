"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { AuthGuard } from "../components/AuthWrapper";
import { useAuth } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: i * 0.08 },
  }),
};

const cardVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.05 },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

interface UploadResponse {
  message: string;
  note: { id: string; title: string; fileUrl: string; };
}

interface Note {
  id: string;
  title: string;
  description: string;
  university: string;
  degree: string;
  stream: string;
  year: string;
  semester: string;
  subject: string;
  price: number;
  fileUrl: string;
  createdAt: string;
}

const ALL_SUBJECTS = [
  "MATHEMATICS-IA","PHYSICS-I","BASIC ELECTRICAL ENGINEERING","CHEMISTRY-I",
  "MATHEMATICS-IIA","PROGRAMMING FOR PROBLEM SOLVING","ENGLISH",
  "ANALOG & DIGITAL ELECTRONICS","DATA STRUCTURES & ALGORITHMS","COMPUTER ORGANISATION",
  "MATHEMATICS-IIIA","ECONOMICS FOR ENGINEERS","DISCRETE MATHEMATICS",
  "COMPUTER ARCHITECTURE","FORMAL LANGUAGE & AUTOMATA THEORY",
  "DESIGN & ANALYSIS OF ALGORITHMS","BIOLOGY","ENVIRONMENTAL SCIENCES",
  "SOFTWARE ENGINEERING","COMPILER DESIGN","OPERATING SYSTEMS",
  "OBJECT ORIENTED PROGRAMMING","INTRODUCTION TO INDUSTRIAL MANAGEMENT",
  "ARTIFICIAL INTELLIGENCE","CONSTITUTION OF INDIA","DATABASE MANAGEMENT SYSTEMS",
  "COMPUTER NETWORKS","DISTRIBUTED SYSTEMS","IMAGE PROCESSING","PATTERN RECOGNITION",
  "NUMERICAL METHODS","RESEARCH METHODOLOGY","DATA WAREHOUSING & DATA MINING",
  "HUMAN RESOURCE DEVELOPMENT & ORGANIZATIONAL BEHAVIOR","MACHINE LEARNING",
  "SOFT COMPUTING","ADHOC-SENSOR NETWORK","OPERATION RESEARCH",
  "MULTIMEDIA TECHNOLOGY","PROJECT MANAGEMENT & ENTREPENEURSHIP",
  "CRYPTOGRAPHY & NETWORK SECURITY","INTERNET OF THINGS","BIG DATA ANALYSIS",
  "MOBILE COMPUTING","E-COMMERCE & ERP",
];

/* ── Stars background ── */
function Stars() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    for (let i = 0; i < 60; i++) {
      const s = document.createElement("div");
      const size = Math.random() * 2 + 0.4;
      s.style.cssText = `position:absolute;border-radius:50%;background:#fff;width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:cn-twinkle ${2+Math.random()*4}s ease-in-out infinite ${Math.random()*4}s;--min:${0.04+Math.random()*0.08};--max:${0.2+Math.random()*0.4};`;
      el.appendChild(s);
    }
    return () => { if (el) el.innerHTML = ""; };
  }, []);
  return <div ref={ref} style={{ position:"fixed", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }} />;
}

/* ── 3-dot menu ── */
function NoteMenu({
  note,
  onEdit,
  onDelete,
}: {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        className="note-menu-btn"
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        title="Options"
      >
        ⋯
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="note-menu-dropdown"
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            <button
              className="note-menu-item"
              onClick={(e) => { e.stopPropagation(); setOpen(false); onEdit(note); }}
            >
              ✏️ Edit
            </button>
            <button
              className="note-menu-item danger"
              onClick={(e) => { e.stopPropagation(); setOpen(false); onDelete(note.id); }}
            >
              🗑 Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Admin Note Card ── */
function AdminNoteCard({
  note,
  index,
  onEdit,
  onDelete,
}: {
  note: Note;
  index: number;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="note-card"
      onClick={() => setExpanded((v) => !v)}
      style={{ cursor: "pointer", position: "relative" }}
      whileHover={{ borderColor: "rgba(96,165,250,0.35)", boxShadow: "0 8px 28px rgba(96,165,250,0.10)", transition: { duration: 0.2 } }}
    >
      <div style={{ position: "absolute", top: 10, right: 10 }} onClick={(e) => e.stopPropagation()}>
        <NoteMenu note={note} onEdit={onEdit} onDelete={onDelete} />
      </div>

      {note.price === 0
        ? <div className="badge-free">● Free</div>
        : <div className="badge-paid">🔒 ₹{note.price}</div>
      }

      <div className="note-title" style={{ paddingRight: 28 }}>{note.title}</div>

      <div
        className="note-desc"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: expanded ? "unset" : 2,
          overflow: "hidden",
        }}
      >
        {note.description}
      </div>

      <div style={{ fontSize: 10, color: "rgba(96,165,250,0.5)", marginTop: 4, letterSpacing: "0.3px" }}>
        {expanded ? "▲ less" : "▼ more"}
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="meta"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="note-meta" style={{ marginTop: "0.5rem" }}>
              <div className="note-meta-row"><span>Subject:</span> {note.subject}</div>
              <div className="note-meta-row"><span>University:</span> {note.university}</div>
              <div className="note-meta-row"><span>Degree:</span> {note.degree} · {note.stream}</div>
              <div className="note-meta-row"><span>Year:</span> {note.year} · <span>Semester:</span> {note.semester}</div>
            </div>
            <div
              style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.85rem" }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.a
                href={note.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-view"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                View PDF ↗
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Update Modal ── */
function UpdateModal({
  note,
  getToken,
  apiUrl,
  onClose,
  onUpdated,
}: {
  note: Note;
  getToken: () => Promise<string | null>;
  apiUrl: string;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [price, setPrice] = useState(String(note.price));
  const [university, setUniversity] = useState(note.university);
  const [degree, setDegree] = useState(note.degree);
  const [stream, setStream] = useState(note.stream);
  const [year, setYear] = useState(String(note.year));
  const [semester, setSemester] = useState(String(note.semester));
  const [subject, setSubject] = useState(note.subject);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error("Authentication failed.");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("university", university);
      formData.append("degree", degree);
      formData.append("stream", stream);
      formData.append("year", year);
      formData.append("semester", semester);
      formData.append("subject", subject);
      if (file) formData.append("file", file);
      const res = await fetch(`${apiUrl}/notes/update/${note.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      onUpdated();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-box"
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: "#e8eaf6" }}>Edit Note</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="cn-field">
            <label className="cn-label">Title</label>
            <input className="cn-input" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="cn-field">
            <label className="cn-label">Description</label>
            <input className="cn-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="cn-field">
            <label className="cn-label">Price (₹)</label>
            <input className="cn-input" type="number" required value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div className="cn-grid" style={{ marginTop: "0.5rem" }}>
            <div className="cn-field">
              <label className="cn-label">University</label>
              <select className="cn-select" value={university} onChange={(e) => setUniversity(e.target.value)}>
                <option value="">Select</option>
                <option>MAKAUT</option>
              </select>
            </div>
            <div className="cn-field">
              <label className="cn-label">Degree</label>
              <select className="cn-select" value={degree} onChange={(e) => setDegree(e.target.value)}>
                <option value="">Select</option>
                <option>B.Tech</option>
              </select>
            </div>
            <div className="cn-field">
              <label className="cn-label">Stream</label>
              <select className="cn-select" value={stream} onChange={(e) => setStream(e.target.value)}>
                <option value="">Select</option>
                <option>CSE</option>
              </select>
            </div>
            <div className="cn-field">
              <label className="cn-label">Year</label>
              <select className="cn-select" value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Select</option>
                {["1","2","3","4"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="cn-field">
              <label className="cn-label">Semester</label>
              <select className="cn-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
                <option value="">Select</option>
                {["1","2","3","4","5","6","7","8"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="cn-field">
              <label className="cn-label">Subject</label>
              <select className="cn-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="">Select</option>
                {ALL_SUBJECTS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="cn-field" style={{ marginTop: "0.5rem" }}>
            <label className="cn-label">Replace PDF (optional)</label>
            <div className="cn-file-wrap" style={{ padding: "1rem" }}>
              <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
              <div className="cn-file-text">{file ? "" : "Click to replace PDF"}</div>
              {file && <div className="cn-file-name">📎 {file.name}</div>}
            </div>
          </div>

          {error && (
            <div className="cn-error" style={{ marginTop: "0.75rem" }}>⚠ {error}</div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: "1rem" }}>
            <button type="button" onClick={onClose} className="cn-submit" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.12)", color: "rgba(200,210,240,0.6)" }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="cn-submit" style={{ flex: 1 }}>
              {loading ? "Saving…" : "Save Changes ↗"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ── Delete Confirm Modal ── */
function DeleteModal({
  noteId,
  getToken,
  apiUrl,
  onClose,
  onDeleted,
}: {
  noteId: string;
  getToken: () => Promise<string | null>;
  apiUrl: string;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true); setError(null);
    try {
      const token = await getToken();
      if (!token) throw new Error("Authentication failed.");
      const res = await fetch(`${apiUrl}/notes/delete/${noteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      onDeleted();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-box"
        style={{ maxWidth: 420 }}
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: "center", padding: "0.5rem 0 1rem" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🗑</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#e8eaf6", marginBottom: 8 }}>Delete this note?</div>
          <div style={{ fontSize: 12, color: "rgba(200,210,240,0.55)", lineHeight: 1.6 }}>
            This action is permanent and cannot be undone. The PDF will also be removed from storage.
          </div>
        </div>
        {error && <div className="cn-error">⚠ {error}</div>}
        <div style={{ display: "flex", gap: 10, marginTop: "1.25rem" }}>
          <button onClick={onClose} className="cn-submit" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.12)", color: "rgba(200,210,240,0.6)" }}>
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="cn-submit"
            style={{ flex: 1, background: "rgba(239,68,68,0.15)", borderColor: "rgba(239,68,68,0.4)", color: "#f87171" }}
          >
            {loading ? "Deleting…" : "Delete Note"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════ */
export default function CreateNotePage() {
  const { getToken } = useAuth();

  /* ── Create form state ── */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [stream, setStream] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResponse | null>(null);

  /* ── Notes list state ── */
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);
  const [deleteNoteId, setDeleteNoteId] = useState<string | null>(null);

  /* ── Filter state ── */
  const [fUniversity, setFUniversity] = useState("");
  const [fDegree, setFDegree] = useState("");
  const [fStream, setFStream] = useState("");
  const [fYear, setFYear] = useState("");
  const [fSemester, setFSemester] = useState("");
  const [fSubject, setFSubject] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  /* ── Fetch all notes ── */
  const fetchNotes = async (filters?: Record<string, string>) => {
    try {
      setNotesLoading(true);
      const token = await getToken();
      if (!token) return;
      const params = new URLSearchParams({ limit: "1000", ...filters });
      const res = await fetch(`${apiUrl}/notes/get-notes?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setNotes(data.success ? data.data : []);
    } catch (err) {
      console.error("Fetch notes error:", err);
      setNotes([]);
    } finally {
      setNotesLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Create note submit ── */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) { setError("Please select a PDF file."); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      const token = await getToken();
      if (!token) throw new Error("Authentication failed.");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("university", university);
      formData.append("degree", degree);
      formData.append("stream", stream);
      formData.append("year", year);
      formData.append("semester", semester);
      formData.append("subject", subject);
      formData.append("file", file);
      const response = await fetch(`${apiUrl}/notes/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Upload failed");
      setResult(data);
      setTitle(""); setDescription(""); setPrice(""); setUniversity("");
      setDegree(""); setStream(""); setYear(""); setSemester(""); setSubject(""); setFile(null);
      fetchNotes();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  const handleApplyFilters = () => {
    const params: Record<string, string> = {};
    if (fUniversity) params.university = fUniversity;
    if (fDegree) params.degree = fDegree;
    if (fStream) params.stream = fStream;
    if (fYear) params.year = fYear;
    if (fSemester) params.semester = fSemester;
    if (fSubject) params.subject = fSubject;
    fetchNotes(params);
  };

  const handleClearFilters = () => {
    setFUniversity(""); setFDegree(""); setFStream("");
    setFYear(""); setFSemester(""); setFSubject("");
    fetchNotes();
  };

  return (
    <AuthGuard>
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
          html, body { background: #080d1e !important; font-family: 'Inter', -apple-system, sans-serif; }
          @keyframes cn-twinkle { 0%,100%{opacity:var(--min,.08);} 50%{opacity:var(--max,.4);} }

          .cn-page {
            min-height: 100vh; position: relative;
            background:
              radial-gradient(ellipse 100% 55% at 50% -5%, rgba(30,60,140,0.55) 0%, transparent 65%),
              radial-gradient(ellipse 60% 45% at 10% 80%, rgba(15,30,90,0.35) 0%, transparent 55%),
              radial-gradient(ellipse 50% 40% at 90% 70%, rgba(20,40,110,0.3) 0%, transparent 55%),
              linear-gradient(180deg, #080d1e 0%, #060a18 40%, #040810 100%);
            padding: 2rem 1rem 5rem;
          }
          .cn-ceiling {
            position:fixed; top:0; left:20%; right:20%; height:4px; z-index:1;
            background:linear-gradient(90deg,transparent,rgba(96,165,250,0.18) 30%,rgba(147,197,253,0.25) 50%,rgba(96,165,250,0.18) 70%,transparent);
            border-radius:3px; box-shadow:0 0 60px 25px rgba(96,165,250,0.07); pointer-events:none;
          }
          .cn-wrap { position:relative; z-index:2; max-width:720px; margin:0 auto; padding-top: 50px; }

          .cn-header { margin-bottom: 2rem; }
          .cn-badge {
            display:inline-flex; align-items:center; gap:6px;
            background:rgba(96,165,250,0.1); border:1px solid rgba(96,165,250,0.25);
            backdrop-filter:blur(14px); border-radius:18px; padding:5px 13px;
            font-size:11px; color:rgba(147,197,253,.9); font-weight:500;
            margin-bottom:1rem; letter-spacing:.5px; text-transform:uppercase;
            transition:background .2s,border-color .2s,box-shadow .2s;
          }
          .cn-badge:hover{background:rgba(96,165,250,0.18);border-color:rgba(96,165,250,0.45);box-shadow:0 0 14px rgba(96,165,250,0.12);}
          .cn-header h1 {
            font-size: clamp(24px, 3.5vw, 36px); font-weight:300;
            letter-spacing:-0.04em; color:#e8eaf6; line-height:1.15;
          }
          .cn-header h1 em {
            font-style:normal;
            background:linear-gradient(135deg,#93c5fd,#60a5fa);
            -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          }

          .cn-card {
            background: rgba(8,15,40,0.75); border: 1px solid rgba(96,165,250,0.15);
            backdrop-filter: blur(20px); border-radius: 18px; padding: 2rem;
            transition: border-color .22s, box-shadow .22s;
          }
          .cn-card:hover { border-color:rgba(96,165,250,0.28); box-shadow:0 4px 36px rgba(96,165,250,0.07); }

          .cn-section-title {
            display: flex; align-items: center; gap: 10px;
            font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
            color: rgba(96,165,250,0.75); font-weight: 500;
            margin-bottom: 1.2rem; margin-top: 0.2rem;
          }
          .cn-section-title::after {
            content:''; flex:1; height:1px;
            background: linear-gradient(90deg, rgba(96,165,250,0.2), transparent);
          }

          .cn-field { margin-bottom: 1rem; }
          .cn-label {
            display:block; font-size:11px; font-weight:500; letter-spacing:0.04em;
            text-transform:uppercase; color:rgba(200,210,240,0.5); margin-bottom:6px;
          }
          .cn-input, .cn-select {
            width:100%; padding:10px 13px;
            background:rgba(255,255,255,0.05); border:1px solid rgba(96,165,250,0.18);
            border-radius:10px; font-size:13px; color:#e8eaf6;
            font-family:'Inter',-apple-system,sans-serif;
            outline:none; transition:border-color 0.18s, background 0.18s, box-shadow 0.18s;
            -webkit-appearance:none; appearance:none;
          }
          .cn-input:hover, .cn-select:hover { border-color:rgba(96,165,250,0.35); background:rgba(96,165,250,0.04); }
          .cn-input:focus, .cn-select:focus {
            border-color:rgba(96,165,250,0.55); background:rgba(96,165,250,0.07);
            box-shadow: 0 0 0 3px rgba(96,165,250,0.08);
          }
          .cn-input::placeholder { color:rgba(180,195,230,0.3); }
          .cn-select { cursor:pointer; }
          .cn-select option { background:#08142a; color:#e8eaf6; }
          .cn-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
          @media(max-width:520px){ .cn-grid{ grid-template-columns:1fr; } }

          .cn-file-wrap {
            position:relative; border:1px dashed rgba(96,165,250,0.25);
            border-radius:10px; padding:1.5rem; text-align:center;
            background:rgba(255,255,255,0.03); cursor:pointer;
            transition:border-color 0.2s, background 0.2s, box-shadow 0.2s;
          }
          .cn-file-wrap:hover { border-color:rgba(96,165,250,0.5); background:rgba(96,165,250,0.06); box-shadow:0 0 16px rgba(96,165,250,0.08); }
          .cn-file-wrap input[type="file"] { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%; }
          .cn-file-icon { font-size:24px; margin-bottom:8px; }
          .cn-file-text { font-size:12px; color:rgba(200,210,240,0.55); }
          .cn-file-name {
            margin-top:8px; font-size:11px; font-weight:500;
            color:#60a5fa; background:rgba(96,165,250,0.1);
            border:1px solid rgba(96,165,250,0.2); border-radius:6px;
            padding:3px 10px; display:inline-block;
          }

          .cn-submit {
            width:100%; padding:12px;
            background:rgba(96,165,250,0.16); border:1px solid rgba(96,165,250,0.4);
            color:#60a5fa; border-radius:12px; font-size:14px; font-weight:500;
            font-family:'Inter',-apple-system,sans-serif;
            cursor:pointer; transition:background 0.2s, box-shadow 0.2s; margin-top:0.5rem;
          }
          .cn-submit:hover:not(:disabled) { background:rgba(96,165,250,0.28); box-shadow:0 4px 20px rgba(96,165,250,0.15); }
          .cn-submit:disabled { opacity:0.45; cursor:not-allowed; }

          .cn-error {
            margin-top:1rem; padding:12px 14px; border-radius:10px;
            background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25);
            font-size:13px; color:rgba(252,165,165,0.9);
          }
          .cn-success {
            margin-top:1rem; padding:12px 14px; border-radius:10px;
            background:rgba(52,211,153,0.1); border:1px solid rgba(52,211,153,0.25);
            font-size:13px; color:rgba(110,231,183,0.9);
          }
          .cn-success a { color:#34d399; text-decoration:none; border-bottom:1px solid rgba(52,211,153,0.4); }
          .cn-success a:hover { color:#6ee7b7; }

          .g-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(96,165,250,0.15) 30%,rgba(96,165,250,0.15) 70%,transparent);margin:2.5rem 0;}

          .filter-panel {
            background:rgba(8,15,40,0.75); border:1px solid rgba(96,165,250,0.15);
            backdrop-filter:blur(20px); border-radius:18px; padding:1.5rem;
            margin-bottom:1.5rem;
          }
          .filter-grid6 { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
          @media(min-width:540px){ .filter-grid6{ grid-template-columns:repeat(3,1fr); } }
          @media(min-width:800px){ .filter-grid6{ grid-template-columns:repeat(6,1fr); } }

          .filter-select-wrap { position:relative; }
          .filter-select-arrow { position:absolute;right:9px;top:50%;transform:translateY(-50%);font-size:9px;color:rgba(96,165,250,0.4);pointer-events:none; }
          .filter-sel {
            width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(96,165,250,0.18);
            border-radius:9px; padding:8px 26px 8px 11px; font-size:11.5px; color:rgba(180,195,230,0.45);
            font-family:'Inter',-apple-system,sans-serif; outline:none; cursor:pointer;
            appearance:none; transition:border-color .18s, background .18s, color .18s;
          }
          .filter-sel.has-val { color:#e8eaf6; }
          .filter-sel:hover { border-color:rgba(96,165,250,0.4); background:rgba(96,165,250,0.05); }
          .filter-sel:focus { border-color:rgba(96,165,250,0.6); background:rgba(96,165,250,0.08); color:#e8eaf6; }
          .filter-sel option { background:#08142a; color:#e8eaf6; }

          .filter-actions { display:flex; gap:8px; margin-top:1rem; }
          .filter-btn {
            padding:8px 18px; border-radius:18px; font-size:11.5px; font-weight:500;
            cursor:pointer; font-family:inherit; transition:all .2s;
          }
          .filter-btn-apply { background:rgba(96,165,250,0.18); border:1px solid rgba(96,165,250,0.4); color:#60a5fa; }
          .filter-btn-apply:hover { background:rgba(96,165,250,0.3); box-shadow:0 0 18px rgba(96,165,250,0.18); }
          .filter-btn-clear { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); color:rgba(200,210,240,0.5); }
          .filter-btn-clear:hover { background:rgba(255,255,255,0.08); color:rgba(200,210,240,0.75); }

          .notes-masonry { column-count:1; column-gap:10px; }
          @media(min-width:520px){ .notes-masonry{ column-count:2; } }
          @media(min-width:800px){ .notes-masonry{ column-count:3; } }
          .notes-masonry > * { display:inline-block; width:100%; margin-bottom:10px; break-inside:avoid; vertical-align:top; }

          .note-card {
            background:rgba(10,20,55,0.6); border:1px solid rgba(96,165,250,0.14);
            backdrop-filter:blur(14px); border-radius:14px; padding:1rem 1.1rem;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .note-title { font-size:13px; font-weight:500; color:#e8eaf6; margin-bottom:.35rem; line-height:1.4; }
          .note-desc { font-size:11.5px; color:rgba(200,210,240,0.6); line-height:1.6; margin-bottom:.3rem; }
          .note-meta { display:flex; flex-direction:column; gap:3px; margin-bottom:.75rem; }
          .note-meta-row { font-size:11px; color:rgba(180,195,230,0.45); }
          .note-meta-row span { color:rgba(200,210,240,0.65); font-weight:500; }

          .badge-free { display:inline-flex;align-items:center;gap:4px;font-size:10px;padding:2px 9px;border-radius:18px;font-weight:500;background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.3);color:#34d399;margin-bottom:.5rem; }
          .badge-paid { display:inline-flex;align-items:center;gap:4px;font-size:10px;padding:2px 9px;border-radius:18px;font-weight:500;background:rgba(167,139,250,0.12);border:1px solid rgba(167,139,250,0.3);color:#a78bfa;margin-bottom:.5rem; }

          .btn-view { padding:7px 16px;background:rgba(96,165,250,0.16);border:1px solid rgba(96,165,250,0.35);color:#60a5fa;border-radius:18px;font-size:11.5px;font-weight:500;cursor:pointer;font-family:inherit;text-decoration:none;display:inline-block;transition:all .18s; }
          .btn-view:hover { background:rgba(96,165,250,0.28); box-shadow:0 0 14px rgba(96,165,250,0.18); }

          .note-menu-btn {
            background:rgba(255,255,255,0.05); border:1px solid rgba(96,165,250,0.15);
            border-radius:7px; color:rgba(180,195,230,0.55); font-size:16px; font-weight:700;
            width:28px; height:28px; display:flex; align-items:center; justify-content:center;
            cursor:pointer; transition:all .18s; padding:0; line-height:1; letter-spacing:1px;
          }
          .note-menu-btn:hover { background:rgba(96,165,250,0.12); border-color:rgba(96,165,250,0.35); color:#60a5fa; }
          .note-menu-dropdown {
            position:absolute; top:34px; right:0; min-width:130px; z-index:100;
            background:rgba(8,18,50,0.97); border:1px solid rgba(96,165,250,0.22);
            backdrop-filter:blur(20px); border-radius:10px;
            padding:4px; box-shadow:0 8px 32px rgba(0,0,10,0.5);
          }
          .note-menu-item {
            display:block; width:100%; text-align:left; background:transparent; border:none;
            padding:8px 12px; font-size:12px; color:rgba(200,210,240,0.75);
            font-family:inherit; cursor:pointer; border-radius:7px;
            transition:background .15s, color .15s;
          }
          .note-menu-item:hover { background:rgba(96,165,250,0.1); color:#e8eaf6; }
          .note-menu-item.danger:hover { background:rgba(239,68,68,0.12); color:#f87171; }

          .state-box { background:rgba(10,20,55,0.6);border:1px solid rgba(96,165,250,0.14);backdrop-filter:blur(14px);border-radius:14px;padding:3rem;text-align:center; }
          .state-emoji { font-size:32px;margin-bottom:.75rem; }
          .state-title { font-size:15px;font-weight:500;color:#e8eaf6;margin-bottom:.4rem; }
          .state-sub { font-size:12px;color:rgba(200,210,240,0.6);line-height:1.6; }

          .modal-backdrop {
            position:fixed; inset:0; background:rgba(2,5,20,0.75);
            backdrop-filter:blur(8px); z-index:1000;
            display:flex; align-items:center; justify-content:center; padding:1rem;
          }
          .modal-box {
            background:rgba(8,15,45,0.98); border:1px solid rgba(96,165,250,0.22);
            backdrop-filter:blur(24px); border-radius:18px;
            padding:1.75rem; width:100%; max-width:640px; max-height:90vh; overflow-y:auto;
          }
          .modal-close {
            background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);
            color:rgba(200,210,240,0.6); border-radius:7px; width:28px; height:28px;
            display:flex; align-items:center; justify-content:center;
            cursor:pointer; font-size:12px; transition:all .18s;
          }
          .modal-close:hover { background:rgba(239,68,68,0.15); border-color:rgba(239,68,68,0.3); color:#f87171; }

          .result-count {
            font-size:10px; letter-spacing:1.5px; text-transform:uppercase;
            color:rgba(96,165,250,.75); font-weight:500; margin-bottom:.75rem;
          }
          .result-count span { color:rgba(200,210,240,0.5); text-transform:none; letter-spacing:0; }
        `}</style>

        <div className="cn-page">
          <Stars />
          <div className="cn-ceiling" />

          <div className="cn-wrap">

            {/* ── CREATE NOTE FORM ── */}
            <div className="cn-header">
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
                <div className="cn-badge">✦ Admin</div>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible">
                Create <em>New Note</em>
              </motion.h1>
            </div>

            <motion.div className="cn-card" custom={2} variants={fadeUp} initial="hidden" animate="visible">
              <form onSubmit={handleSubmit}>
                <motion.div className="cn-section-title" custom={3} variants={fadeUp} initial="hidden" animate="visible">
                  Note Information
                </motion.div>

                <motion.div className="cn-field" custom={4} variants={fadeUp} initial="hidden" animate="visible">
                  <label className="cn-label">Title</label>
                  <input className="cn-input" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Complete DBMS — Sem 5" />
                </motion.div>

                <motion.div className="cn-field" custom={5} variants={fadeUp} initial="hidden" animate="visible">
                  <label className="cn-label">Description</label>
                  <input className="cn-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the note" />
                </motion.div>

                <motion.div className="cn-field" custom={6} variants={fadeUp} initial="hidden" animate="visible">
                  <label className="cn-label">Price (₹) — enter 0 for free</label>
                  <input className="cn-input" type="number" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" />
                </motion.div>

                <motion.div className="cn-section-title" style={{ marginTop:"1.5rem" }} custom={7} variants={fadeUp} initial="hidden" animate="visible">
                  Academic Information
                </motion.div>

                <motion.div className="cn-grid" custom={8} variants={fadeUp} initial="hidden" animate="visible">
                  <div className="cn-field">
                    <label className="cn-label">University</label>
                    <select className="cn-select" value={university} onChange={(e) => setUniversity(e.target.value)}>
                      <option value="">Select University</option>
                      <option>MAKAUT</option>
                    </select>
                  </div>
                  <div className="cn-field">
                    <label className="cn-label">Degree</label>
                    <select className="cn-select" value={degree} onChange={(e) => setDegree(e.target.value)}>
                      <option value="">Select Degree</option>
                      <option>B.Tech</option>
                    </select>
                  </div>
                  <div className="cn-field">
                    <label className="cn-label">Stream</label>
                    <select className="cn-select" value={stream} onChange={(e) => setStream(e.target.value)}>
                      <option value="">Select Stream</option>
                      <option>CSE</option>
                    </select>
                  </div>
                  <div className="cn-field">
                    <label className="cn-label">Year</label>
                    <select className="cn-select" value={year} onChange={(e) => setYear(e.target.value)}>
                      <option value="">Select Year</option>
                      {["1","2","3","4"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="cn-field">
                    <label className="cn-label">Semester</label>
                    <select className="cn-select" value={semester} onChange={(e) => setSemester(e.target.value)}>
                      <option value="">Select Semester</option>
                      {["1","2","3","4","5","6","7","8"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="cn-field">
                    <label className="cn-label">Subject</label>
                    <select className="cn-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
                      <option value="">Select Subject</option>
                      {ALL_SUBJECTS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </motion.div>

                <motion.div className="cn-section-title" style={{ marginTop:"1.5rem" }} custom={9} variants={fadeUp} initial="hidden" animate="visible">
                  Upload PDF
                </motion.div>

                <motion.div className="cn-field" custom={10} variants={fadeUp} initial="hidden" animate="visible">
                  <div className="cn-file-wrap">
                    <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                    <div className="cn-file-icon">📄</div>
                    <div className="cn-file-text">{file ? "" : "Click or drag a PDF file here"}</div>
                    {file && <div className="cn-file-name">📎 {file.name}</div>}
                  </div>
                </motion.div>

                <motion.button
                  type="submit" disabled={loading} className="cn-submit"
                  custom={11} variants={fadeUp} initial="hidden" animate="visible"
                  whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
                >
                  {loading ? "Uploading…" : "Create Note ↗"}
                </motion.button>
              </form>

              <AnimatePresence>
                {error && (
                  <motion.div className="cn-error" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.3 }}>
                    ⚠ {error}
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {result && (
                  <motion.div className="cn-success" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.3 }}>
                    <p style={{ fontWeight:500, marginBottom:4 }}>{result.message}</p>
                    <a href={result.note.fileUrl} target="_blank" rel="noreferrer">View Uploaded PDF ↗</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="g-divider" />

            {/* ── VIEW NOTES SECTION ── */}
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.5, ease:[0.22,1,0.36,1], delay:0.3 }}
            >
              <div style={{ marginBottom:"1.5rem" }}>
                <div style={{ fontSize:10, letterSpacing:"1.5px", textTransform:"uppercase", color:"rgba(96,165,250,.75)", fontWeight:500, marginBottom:4 }}>Admin panel</div>
                <h2 style={{ fontSize:"clamp(20px,3vw,28px)", fontWeight:300, letterSpacing:"-0.04em", color:"#e8eaf6", margin:0 }}>
                  All <span style={{ background:"linear-gradient(135deg,#93c5fd,#60a5fa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontWeight:600 }}>Notes</span>
                </h2>
              </div>

              {/* FILTER PANEL */}
              <div className="filter-panel">
                <div style={{ fontSize:10, letterSpacing:"1.5px", textTransform:"uppercase", color:"rgba(96,165,250,.75)", fontWeight:500, marginBottom:".75rem" }}>
                  Filter notes
                </div>
                <div className="filter-grid6">
                  {[
                    { val: fUniversity, set: setFUniversity, opts: ["MAKAUT"], ph: "University" },
                    { val: fDegree,     set: setFDegree,     opts: ["B.Tech"], ph: "Degree" },
                    { val: fStream,     set: setFStream,     opts: ["CSE"],    ph: "Stream" },
                    { val: fYear,       set: setFYear,       opts: ["1","2","3","4"], ph: "Year" },
                    { val: fSemester,   set: setFSemester,   opts: ["1","2","3","4","5","6","7","8"], ph: "Semester" },
                    { val: fSubject,    set: setFSubject,    opts: ALL_SUBJECTS, ph: "Subject" },
                  ].map(({ val, set, opts, ph }) => (
                    <div key={ph} className="filter-select-wrap">
                      <select
                        className={`filter-sel${val ? " has-val" : ""}`}
                        value={val}
                        onChange={(e) => set(e.target.value)}
                      >
                        <option value="">{ph}</option>
                        {opts.map((o) => <option key={o}>{o}</option>)}
                      </select>
                      <span className="filter-select-arrow">▾</span>
                    </div>
                  ))}
                </div>
                <div className="filter-actions">
                  <motion.button onClick={handleApplyFilters} className="filter-btn filter-btn-apply" whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}>
                    Apply →
                  </motion.button>
                  <motion.button onClick={handleClearFilters} className="filter-btn filter-btn-clear" whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}>
                    Clear
                  </motion.button>
                </div>
              </div>

              {/* NOTES LIST */}
              <AnimatePresence mode="wait">
                {notesLoading ? (
                  <motion.div key="loading" className="state-box" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                    <motion.div className="state-emoji" animate={{ rotate:[0,10,-10,0] }} transition={{ repeat:Infinity, duration:1.4, ease:"easeInOut" }}>⏳</motion.div>
                    <div className="state-title">Loading notes…</div>
                    <div className="state-sub">Fetching from the database.</div>
                  </motion.div>
                ) : notes.length === 0 ? (
                  <motion.div key="empty" className="state-box" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                    <div className="state-emoji">📭</div>
                    <div className="state-title">No notes found</div>
                    <div className="state-sub">Try adjusting filters or create a new note above.</div>
                  </motion.div>
                ) : (
                  <motion.div key="list" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}>
                    <div className="result-count">
                      All notes · <span>{notes.length} result{notes.length !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="notes-masonry">
                      {notes.map((note, i) => (
                        <AdminNoteCard
                          key={note.id}
                          note={note}
                          index={i}
                          onEdit={(n) => setEditNote(n)}
                          onDelete={(id) => setDeleteNoteId(id)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>

        {/* ── MODALS — getToken passed directly, called fresh on each action ── */}
        <AnimatePresence>
          {editNote && (
            <UpdateModal
              key="edit-modal"
              note={editNote}
              getToken={getToken}
              apiUrl={apiUrl || ""}
              onClose={() => setEditNote(null)}
              onUpdated={() => fetchNotes()}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {deleteNoteId && (
            <DeleteModal
              key="delete-modal"
              noteId={deleteNoteId}
              getToken={getToken}
              apiUrl={apiUrl || ""}
              onClose={() => setDeleteNoteId(null)}
              onDeleted={() => fetchNotes()}
            />
          )}
        </AnimatePresence>

      </>
    </AuthGuard>
  );
}