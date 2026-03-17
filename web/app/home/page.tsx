"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { AuthGuard } from "../components/AuthWrapper";
import { useAuth, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
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

/* ─── SEMESTER → SUBJECTS MAP ─── */
const SEMESTER_SUBJECTS: Record<string, string[]> = {
  "1": ["MATHEMATICS-IA", "PHYSICS-I", "BASIC ELECTRICAL ENGINEERING"],
  "2": ["CHEMISTRY-I", "MATHEMATICS-IIA", "PROGRAMMING FOR PROBLEM SOLVING", "ENGLISH"],
  "3": ["ANALOG & DIGITAL ELECTRONICS", "DATA STRUCTURES & ALGORITHMS", "COMPUTER ORGANISATION", "MATHEMATICS-IIIA", "ECONOMICS FOR ENGINEERS"],
  "4": ["DISCRETE MATHEMATICS", "COMPUTER ARCHITECTURE", "FORMAL LANGUAGE & AUTOMATA THEORY", "DESIGN & ANALYSIS OF ALGORITHMS", "BIOLOGY", "ENVIRONMENTAL SCIENCES"],
  "5": ["SOFTWARE ENGINEERING", "COMPILER DESIGN", "OPERATING SYSTEMS", "OBJECT ORIENTED PROGRAMMING", "INTRODUCTION TO INDUSTRIAL MANAGEMENT", "ARTIFICIAL INTELLIGENCE", "CONSTITUTION OF INDIA"],
  "6": ["DATABASE MANAGEMENT SYSTEMS", "COMPUTER NETWORKS", "DISTRIBUTED SYSTEMS", "IMAGE PROCESSING", "PATTERN RECOGNITION", "NUMERICAL METHODS", "RESEARCH METHODOLOGY", "DATA WAREHOUSING & DATA MINING", "HUMAN RESOURCE DEVELOPMENT & ORGANIZATIONAL BEHAVIOR"],
  "7": ["MACHINE LEARNING", "SOFT COMPUTING", "ADHOC-SENSOR NETWORK", "OPERATION RESEARCH", "MULTIMEDIA TECHNOLOGY", "PROJECT MANAGEMENT & ENTREPENEURSHIP"],
  "8": ["CRYPTOGRAPHY & NETWORK SECURITY", "INTERNET OF THINGS", "BIG DATA ANALYSIS", "MOBILE COMPUTING", "E-COMMERCE & ERP"],
};

const ALL_SUBJECTS = Object.values(SEMESTER_SUBJECTS).flat();

/* ─── SELECT COMPONENT ─── */
function Select({
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div className="select-wrap">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`filter-select${value ? " has-value" : ""}${disabled ? " disabled" : ""}`}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <span className="select-arrow">▾</span>
    </div>
  );
}

/* ─── NOTE CARD with expand/collapse ─── */
function NoteCard({
  note,
  index,
  purchased,
  onBuy,
}: {
  note: Note;
  index: number;
  purchased: boolean;
  onBuy: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{
        borderColor: purchased ? "rgba(52,211,153,0.42)" : "rgba(96,165,250,0.35)",
        boxShadow: purchased
          ? "0 8px 28px rgba(52,211,153,0.09)"
          : "0 8px 28px rgba(96,165,250,0.10)",
        transition: { duration: 0.2 },
      }}
      className={`note-card${purchased ? " purchased" : ""}`}
      onClick={() => setExpanded((v) => !v)}
      style={{ cursor: "pointer" }}
    >
      <div>
        {/* Badge */}
        {note.price === 0
          ? <div className="badge-free">● Free</div>
          : purchased
            ? <div className="badge-owned">✓ Owned</div>
            : <div className="badge-paid">🔒 ₹{note.price}</div>
        }

        {/* Title */}
        <div className="note-title">{note.title}</div>

        {/* Description — clamp to 2 lines when collapsed */}
        <div
          className="note-desc"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: expanded ? "unset" : 2,
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
        >
          {note.description}
        </div>

        {/* Expand/collapse hint */}
        <div style={{
          fontSize: 10,
          color: "rgba(96,165,250,0.5)",
          marginTop: 4,
          marginBottom: expanded ? "0.75rem" : 0,
          letterSpacing: "0.3px",
        }}>
          {expanded ? "▲ less" : "▼ more"}
        </div>

        {/* Meta — only show when expanded */}
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

              {/* Action button */}
              <div
                style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.85rem" }}
                onClick={(e) => e.stopPropagation()}
              >
                {note.price === 0 || purchased ? (
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
                ) : (
                  <motion.button
                    onClick={() => onBuy(note.id)}
                    className="btn-buy"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    Buy ₹{note.price}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── PURCHASED NOTE CARD with expand/collapse ─── */
function PurchasedNoteCard({ note, index }: { note: Note; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      key={note.id}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -4,
        borderColor: "rgba(52,211,153,0.45)",
        boxShadow: "0 8px 28px rgba(52,211,153,0.10)",
        transition: { duration: 0.2 },
      }}
      className="note-card purchased"
      onClick={() => setExpanded((v) => !v)}
      style={{ cursor: "pointer" }}
    >
      <div>
        <div className="badge-owned">✓ Owned</div>
        <div className="note-title">{note.title}</div>

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
                <div className="note-meta-row"><span>University:</span> {note.university}</div>
                <div className="note-meta-row"><span>Degree:</span> {note.degree} · {note.stream}</div>
                <div className="note-meta-row"><span>Year:</span> {note.year} · <span>Semester:</span> {note.semester}</div>
                <div className="note-meta-row"><span>Subject:</span> {note.subject}</div>
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  View PDF ↗
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── ANIMATION VARIANTS ─── */
const fadeUp: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.07 },
  }),
};

const cardVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.06 },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const stateBoxVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

export default function ViewNotes() {
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [purchasedNotes, setPurchasedNotes] = useState<string[]>([]);
  const [purchasedNotesData, setPurchasedNotesData] = useState<Note[]>([]);

  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [stream, setStream] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  /* ─── Derive subject list from selected semester ─── */
  const availableSubjects = useMemo(() => {
    if (!semester) return ALL_SUBJECTS;
    return SEMESTER_SUBJECTS[semester] ?? [];
  }, [semester]);

  /* Reset subject whenever semester changes */
  useEffect(() => {
    setSubject("");
  }, [semester]);

  const loadRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    const syncUser = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/create`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("User sync error:", err);
      }
    };
    syncUser();
  }, [isLoaded, isSignedIn, getToken]);

  const fetchNotes = async (filters?: Record<string, string>) => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) return;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/get-notes`,
        { params: { limit: 1000, ...filters }, headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(response.data.success ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchasedNotes = async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/my-purchases`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const purchased = res.data.data || [];
      setPurchasedNotesData(purchased);
      setPurchasedNotes(purchased.map((n: Note) => n.id));
    } catch (err) {
      console.error("Purchase fetch error:", err);
    }
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetchNotes();
    fetchPurchasedNotes();
  }, [isLoaded, isSignedIn]);

  const buyNote = async (noteId: string) => {
    try {
      const token = await getToken();
      if (!token) return;
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`,
        { noteId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res.data;
      const loaded = await loadRazorpay();
      if (!loaded) { alert("Payment gateway failed to load"); return; }
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/payment/verify`,
            { ...response, purchaseId: data.purchaseId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          await fetchPurchasedNotes();
          alert("Payment successful!");
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const handleApplyFilters = () => {
    const params: Record<string, string> = {};
    if (university) params.university = university;
    if (degree) params.degree = degree;
    if (stream) params.stream = stream;
    if (year) params.year = year;
    if (semester) params.semester = semester;
    if (subject) params.subject = subject;
    fetchNotes(params);
  };

  return (
    <AuthGuard>
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          body{font-family:'Inter',-apple-system,sans-serif;background:#050814;color:#e8eaf6;overflow-x:hidden;}

          .home-scene{
            background:
              radial-gradient(ellipse 100% 55% at 50% -5%,rgba(30,60,140,0.55) 0%,transparent 65%),
              radial-gradient(ellipse 60% 45% at 10% 80%,rgba(15,30,90,0.35) 0%,transparent 55%),
              radial-gradient(ellipse 50% 40% at 90% 70%,rgba(20,40,110,0.3) 0%,transparent 55%),
              linear-gradient(180deg,#080d1e 0%,#060a18 40%,#040810 100%);
            min-height:100vh;position:relative;padding-top:50px;}

          .ceiling-light{position:absolute;top:2%;left:20%;right:20%;height:5px;background:linear-gradient(90deg,transparent,rgba(96,165,250,0.18) 30%,rgba(147,197,253,0.25) 50%,rgba(96,165,250,0.18) 70%,transparent);border-radius:3px;box-shadow:0 0 60px 25px rgba(96,165,250,0.08);pointer-events:none;}

          .home-wrap{position:relative;z-index:10;max-width:1000px;margin:0 auto;padding:2rem 1.75rem 3rem;}

          .page-header{margin-bottom:1.75rem;}
          .page-eyebrow{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(96,165,250,.75);font-weight:500;margin-bottom:.4rem;}
          .page-title{font-size:clamp(22px,3.5vw,32px);font-weight:300;letter-spacing:-.6px;color:#e8eaf6;margin-bottom:.4rem;}
          .page-title strong{font-weight:700;background:linear-gradient(135deg,#93c5fd,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

          .section-label{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(96,165,250,.75);font-weight:500;margin-bottom:.6rem;}
          .section-h2{font-size:16px;font-weight:500;color:#e8eaf6;margin-bottom:1rem;letter-spacing:-.2px;}

          .g-panel{background:rgba(10,20,55,0.65);border:1px solid rgba(96,165,250,0.16);backdrop-filter:blur(22px);border-radius:16px;padding:1.5rem;transition:border-color .22s,box-shadow .22s;}
          .g-panel:hover{border-color:rgba(96,165,250,0.32);box-shadow:0 4px 36px rgba(96,165,250,0.08);}

          .filter-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
          @media(min-width:600px){.filter-grid{grid-template-columns:repeat(3,1fr);}}
          @media(min-width:900px){.filter-grid{grid-template-columns:repeat(6,1fr);}}

          .select-wrap{position:relative;width:100%;}
          .select-arrow{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:10px;color:rgba(96,165,250,0.4);pointer-events:none;transition:color .18s,transform .22s;}
          .select-wrap:hover .select-arrow{color:rgba(96,165,250,0.9);}
          .select-wrap:focus-within .select-arrow{color:#60a5fa;transform:translateY(-50%) rotate(180deg);}

          .filter-select{width:100%;background:rgba(10,20,55,0.55);border:1px solid rgba(96,165,250,0.16);border-radius:10px;padding:9px 28px 9px 12px;font-size:12px;color:rgba(180,195,230,0.45);font-family:inherit;outline:none;cursor:pointer;appearance:none;backdrop-filter:blur(14px);transition:border-color .18s,background .18s,box-shadow .18s,color .18s;}
          .filter-select.has-value{color:#e8eaf6;}
          .filter-select.disabled{opacity:0.45;cursor:not-allowed;}
          .filter-select:not(.disabled):hover{border-color:rgba(96,165,250,0.42);background:rgba(16,30,78,0.72);box-shadow:0 0 14px rgba(96,165,250,0.08);}
          .filter-select:not(.disabled):focus{border-color:rgba(96,165,250,0.62);background:rgba(16,32,82,0.82);box-shadow:0 0 0 3px rgba(96,165,250,0.1),0 0 20px rgba(96,165,250,0.09);color:#e8eaf6;}
          .filter-select option{background:#08142a;color:#e8eaf6;}
          .filter-select option:first-child{color:rgba(180,195,230,0.45);}

          .apply-btn{margin-top:1rem;padding:9px 22px;background:rgba(96,165,250,0.18);border:1px solid rgba(96,165,250,0.4);color:#60a5fa;border-radius:20px;font-size:12px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .2s;}
          .apply-btn:hover{background:rgba(96,165,250,0.3);box-shadow:0 0 18px rgba(96,165,250,0.18);}

          .sem-hint{font-size:10px;color:rgba(96,165,250,0.45);margin-top:6px;letter-spacing:0.2px;}

          .notes-grid{column-count:1;column-gap:10px;}
          @media(min-width:540px){.notes-grid{column-count:2;}}
          @media(min-width:900px){.notes-grid{column-count:3;}}
          .notes-grid > *{display:inline-block;width:100%;margin-bottom:10px;break-inside:avoid;vertical-align:top;}

          .note-card{
            background:rgba(10,20,55,0.6);
            border:1px solid rgba(96,165,250,0.14);
            backdrop-filter:blur(14px);
            border-radius:14px;
            padding:1rem 1.1rem;
            display:flex;
            flex-direction:column;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .note-card.purchased{border-color:rgba(52,211,153,0.2);background:rgba(10,35,25,0.5);}

          .note-title{font-size:13px;font-weight:500;color:#e8eaf6;margin-bottom:.35rem;line-height:1.4;}
          .note-desc{font-size:11.5px;color:rgba(200,210,240,0.6);line-height:1.6;margin-bottom:.3rem;}
          .note-meta{display:flex;flex-direction:column;gap:3px;margin-bottom:.75rem;}
          .note-meta-row{font-size:11px;color:rgba(180,195,230,0.45);}
          .note-meta-row span{color:rgba(200,210,240,0.65);font-weight:500;}

          .badge-free{display:inline-flex;align-items:center;gap:4px;font-size:10px;padding:2px 9px;border-radius:18px;font-weight:500;background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.3);color:#34d399;margin-bottom:.5rem;}
          .badge-paid{display:inline-flex;align-items:center;gap:4px;font-size:10px;padding:2px 9px;border-radius:18px;font-weight:500;background:rgba(167,139,250,0.12);border:1px solid rgba(167,139,250,0.3);color:#a78bfa;margin-bottom:.5rem;}
          .badge-owned{display:inline-flex;align-items:center;gap:4px;font-size:10px;padding:2px 9px;border-radius:18px;font-weight:500;background:rgba(52,211,153,0.12);border:1px solid rgba(52,211,153,0.3);color:#34d399;margin-bottom:.5rem;}

          .btn-view{padding:7px 16px;background:rgba(96,165,250,0.16);border:1px solid rgba(96,165,250,0.35);color:#60a5fa;border-radius:18px;font-size:11.5px;font-weight:500;cursor:pointer;font-family:inherit;text-decoration:none;display:inline-block;transition:all .18s;}
          .btn-view:hover{background:rgba(96,165,250,0.28);box-shadow:0 0 14px rgba(96,165,250,0.18);}
          .btn-buy{padding:7px 16px;background:rgba(167,139,250,0.16);border:1px solid rgba(167,139,250,0.35);color:#a78bfa;border-radius:18px;font-size:11.5px;font-weight:500;cursor:pointer;font-family:inherit;transition:all .18s;}
          .btn-buy:hover{background:rgba(167,139,250,0.28);box-shadow:0 0 14px rgba(167,139,250,0.18);}

          .state-box{background:rgba(10,20,55,0.6);border:1px solid rgba(96,165,250,0.14);backdrop-filter:blur(14px);border-radius:14px;padding:2.5rem;text-align:center;}
          .state-emoji{font-size:32px;margin-bottom:.75rem;}
          .state-title{font-size:15px;font-weight:500;color:#e8eaf6;margin-bottom:.4rem;}
          .state-sub{font-size:12px;color:rgba(200,210,240,0.6);line-height:1.6;}

          .g-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(96,165,250,0.15) 30%,rgba(96,165,250,0.15) 70%,transparent);margin:2rem 0;}
        `}</style>

        <div className="home-scene">
          <div className="ceiling-light" />

          <div className="home-wrap">

            {/* PAGE HEADER */}
            <motion.div
              className="page-header"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="page-eyebrow">Study material</div>
              <h1 className="page-title"><strong style={{background:"none",WebkitTextFillColor:"#ffffff",color:"#ffffff"}}>Browse</strong> <strong>Notes</strong></h1>
            </motion.div>

            {/* ── PURCHASED NOTES ── */}
            <AnimatePresence>
              {purchasedNotesData.length > 0 && (
                <motion.div
                  key="purchased-section"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ marginBottom: "1.75rem" }}
                >
                  <div className="section-label">Your collection</div>
                  <div className="section-h2">Purchased Notes</div>
                  <div className="notes-grid">
                    {purchasedNotesData.map((note, i) => (
                      <PurchasedNoteCard key={note.id} note={note} index={i} />
                    ))}
                  </div>
                  <div className="g-divider" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── FILTER SECTION ── */}
            <motion.div
              className="g-panel"
              style={{ marginBottom: "1.75rem" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <div className="section-label" style={{ marginBottom: ".65rem" }}>Filter notes</div>
              <div className="filter-grid">
                <Select value={university} onChange={setUniversity} options={["MAKAUT"]} placeholder="University" />
                <Select value={degree} onChange={setDegree} options={["B.Tech"]} placeholder="Degree" />
                <Select value={stream} onChange={setStream} options={["CSE"]} placeholder="Stream" />
                <Select value={year} onChange={setYear} options={["1", "2", "3", "4"]} placeholder="Year" />
                <Select
                  value={semester}
                  onChange={setSemester}
                  options={["1", "2", "3", "4", "5", "6", "7", "8"]}
                  placeholder="Semester"
                />
                <Select
                  value={subject}
                  onChange={setSubject}
                  options={availableSubjects}
                  placeholder={semester ? "Subject" : "Subject (pick sem first)"}
                  disabled={availableSubjects.length === 0}
                />
              </div>

              {/* Subtle hint when a semester is selected */}
              {semester && (
                <div className="sem-hint">
                  Showing {availableSubjects.length} subject{availableSubjects.length !== 1 ? "s" : ""} for Semester {semester}
                  {subject && (
                    <span
                      style={{ marginLeft: 10, color: "rgba(96,165,250,0.65)", cursor: "pointer" }}
                      onClick={() => setSubject("")}
                    >
                      · clear subject ✕
                    </span>
                  )}
                </div>
              )}

              <motion.button
                onClick={handleApplyFilters}
                className="apply-btn"
                whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(96,165,250,0.22)" }}
                whileTap={{ scale: 0.96 }}
              >
                Apply Filters →
              </motion.button>
            </motion.div>

            {/* ── ALL NOTES ── */}
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  className="state-box"
                  variants={stateBoxVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div
                    className="state-emoji"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                  >
                    ⏳
                  </motion.div>
                  <div className="state-title">Loading notes...</div>
                  <div className="state-sub">Fetching the latest study material for you.</div>
                </motion.div>
              ) : notes.length === 0 ? (
                <motion.div
                  key="empty"
                  className="state-box"
                  variants={stateBoxVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="state-emoji">📭</div>
                  <div className="state-title">No Notes Found</div>
                  <div className="state-sub">Try adjusting your filters or browse another subject.</div>
                </motion.div>
              ) : (
                <motion.div
                  key="notes-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="section-label">
                    All notes · <span style={{ color: "rgba(200,210,240,0.5)", textTransform: "none", letterSpacing: 0 }}>{notes.length} result{notes.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="notes-grid">
                    {notes.map((note, i) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        index={i}
                        purchased={purchasedNotes.includes(note.id)}
                        onBuy={buyNote}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </>
    </AuthGuard>
  );
}