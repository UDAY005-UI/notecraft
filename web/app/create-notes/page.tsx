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

interface UploadResponse {
  message: string;
  note: {
    id: string;
    title: string;
    fileUrl: string;
  };
}

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

export default function CreateNotePage() {
  const { getToken } = useAuth();

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) { setError("Please select a PDF file."); return; }
    setLoading(true); setError(null); setResult(null);
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
    try {
      const token = await getToken();
      if (!token) throw new Error("Authentication failed.");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Upload failed");
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
          html, body { background: #080d1e !important; font-family: 'Inter', -apple-system, sans-serif; }
          @keyframes cn-twinkle { 0%,100%{opacity:var(--min,.08);} 50%{opacity:var(--max,.4);} }

          .cn-page {
            padding-top: 50px;
            min-height: 100vh;
            position: relative;
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
          .cn-wrap { position:relative; z-index:2; max-width:680px; margin:0 auto; }

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
            background: rgba(8,15,40,0.75);
            border: 1px solid rgba(96,165,250,0.15);
            backdrop-filter: blur(20px);
            border-radius: 18px;
            padding: 2rem;
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
            border-color:rgba(96,165,250,0.55);
            background:rgba(96,165,250,0.07);
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
          .cn-file-wrap input[type="file"] {
            position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%;
          }
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
        `}</style>

        <div className="cn-page">
          <Stars />
          <div className="cn-ceiling" />

          <div className="cn-wrap">

            {/* HEADER */}
            <div className="cn-header">
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
                <div className="cn-badge">✦ Admin</div>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible">
                Create <em>New Note</em>
              </motion.h1>
            </div>

            {/* CARD */}
            <motion.div
              className="cn-card"
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
            >
              <form onSubmit={handleSubmit}>

                {/* NOTE INFORMATION */}
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

                {/* ACADEMIC INFORMATION */}
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
                      {[
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
                      ].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </motion.div>

                {/* UPLOAD PDF */}
                <motion.div className="cn-section-title" style={{ marginTop:"1.5rem" }} custom={9} variants={fadeUp} initial="hidden" animate="visible">
                  Upload PDF
                </motion.div>

                <motion.div className="cn-field" custom={10} variants={fadeUp} initial="hidden" animate="visible">
                  <div className="cn-file-wrap">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    />
                    <div className="cn-file-icon">📄</div>
                    <div className="cn-file-text">
                      {file ? "" : "Click or drag a PDF file here"}
                    </div>
                    {file && <div className="cn-file-name">📎 {file.name}</div>}
                  </div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="cn-submit"
                  custom={11} variants={fadeUp} initial="hidden" animate="visible"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? "Uploading…" : "Create Note ↗"}
                </motion.button>

              </form>

              {/* FEEDBACK */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="cn-error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    ⚠ {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {result && (
                  <motion.div
                    className="cn-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p style={{ fontWeight:500, marginBottom:4 }}>{result.message}</p>
                    <a href={result.note.fileUrl} target="_blank" rel="noreferrer">
                      View Uploaded PDF ↗
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        </div>
      </>
    </AuthGuard>
  );
}