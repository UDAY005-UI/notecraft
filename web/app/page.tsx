"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

// ─── SHELF DATA ───────────────────────────────────────────────────────────────
const SHELF_NOTES = [
  { id: "1", shortTitle: "Complete DSA",          title: "Data Structures & Algorithms",                       subject: "DSA",   university: "MAKAUT", semester: 3, premium: false,             width: 25,  height: 148, color: "linear-gradient(180deg,#0d1f4a,#091535)" },
  { id: "2", shortTitle: "Mathematics-III",       title: "Engineering Mathematics III",                        subject: "Maths", university: "MAKAUT", semester: 3, premium: false,             width: 20,  height: 132, color: "linear-gradient(180deg,#0a1a3e,#071228)" },
  { id: "4", shortTitle: "Complete ADE",          title: "Analog & Digital Electronics",                       subject: "ADE",   university: "MAKAUT", semester: 3, premium: true,  price: 59,  width: 22,  height: 138, color: "linear-gradient(180deg,#0b1d44,#07132e)" },
  { id: "3", shortTitle: "Automata Theory",       title: "Formal Language & Automata Theory",                  subject: "FLAT",  university: "MAKAUT", semester: 4, premium: true,  price: 39,  width: 29,  height: 160, color: "linear-gradient(180deg,#0c2248,#071830)" },
  { id: "5", shortTitle: "Complete SE",           title: "Software Engineering",                               subject: "SE",    university: "MAKAUT", semester: 5, premium: false,             width: 122, height: 190, color: "linear-gradient(155deg,#0f2d5e,#071d42)", featured: true },
  { id: "6", shortTitle: "OOPs Concepts",         title: "Object Oriented Programming",                        subject: "OOP",   university: "MAKAUT", semester: 5, premium: true,  price: 49,  width: 23,  height: 145, color: "linear-gradient(180deg,#10204a,#0b1835)" },
  { id: "7", shortTitle: "Complete DBMS",         title: "Database Management System",                         subject: "DBMS",  university: "MAKAUT", semester: 6, premium: false,             width: 27,  height: 158, color: "linear-gradient(180deg,#0e2246,#091832)" },
  { id: "8", shortTitle: "IOT Concepts",          title: "Internet of things",                                 subject: "IOT",   university: "MAKAUT", semester: 8, premium: false,             width: 21,  height: 136, color: "linear-gradient(180deg,#0d1e42,#08152e)" },
  { id: "9", shortTitle: "Data Analytics",        title: "Big Data Analytics",                                 subject: "BDA",   university: "MAKAUT", semester: 8, premium: false,             width: 24,  height: 150, color: "linear-gradient(180deg,#0c1e48,#071530)" },
];

const STATS = [
  { num: "248",  label: "Notes" },
  { num: "6",    label: "Universities" },
  { num: "12k+", label: "Downloads" },
  { num: "2.4k", label: "Students" },
];

const SUBJECTS = [
  { name: "CSE",     emoji: "💻", count: 84 },
  { name: "ECE",     emoji: "⚡", count: 52 },
  { name: "Mech",    emoji: "⚙️", count: 41 },
  { name: "Civil",   emoji: "🏗️", count: 33 },
  { name: "Science", emoji: "🔬", count: 24 },
  { name: "Maths",   emoji: "🧮", count: 14 },
];

// ─── STARS ────────────────────────────────────────────────────────────────────
function Stars() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    for (let i = 0; i < 90; i++) {
      const s = document.createElement("div");
      const size = Math.random() * 2 + 0.5;
      s.style.cssText = `
        position:absolute;border-radius:50%;background:#fff;
        width:${size}px;height:${size}px;
        left:${Math.random() * 100}%;top:${Math.random() * 100}%;
        animation:twinkle ${2 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 4}s;
        --min:${0.05 + Math.random() * 0.1};--max:${0.3 + Math.random() * 0.5};
      `;
      el.appendChild(s);
    }
    return () => { if (el) el.innerHTML = ""; };
  }, []);
  return <div ref={ref} className="absolute inset-0 pointer-events-none" style={{ overflow: "hidden" }} />;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { openSignUp } = useClerk();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/view-notes");
    } else {
      openSignUp({ afterSignInUrl: "/view-notes", afterSignUpUrl: "/view-notes" });
    }
  };

  const handleBrowseComponents = () => {
    router.push("/view-notes");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        /* ── force dark bg on html/body so no white bleeds through ── */
        html, body {
          background: #080d1e !important;
          margin: 0;
          padding: 0;
        }

        .nc-page * { box-sizing: border-box; }
        .nc-page {
          font-family: 'Inter', system-ui, sans-serif;
          background: linear-gradient(180deg,#080d1e 0%,#060a18 40%,#040810 100%);
          color: #e8eaf6;
          overflow-x: hidden;
          position: relative;
          /* extend behind fixed navbar at top */
          min-height: 100vh;
        }

        @keyframes twinkle {
          0%,100% { opacity: var(--min,0.1); }
          50%      { opacity: var(--max,0.6); }
        }
        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes floatY {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-8px); }
        }

        .nc-anim-1 { animation: fadeInUp 0.55s 0.05s ease both; }
        .nc-anim-2 { animation: fadeInUp 0.55s 0.15s ease both; }
        .nc-anim-3 { animation: fadeInUp 0.55s 0.25s ease both; }
        .nc-anim-4 { animation: fadeInUp 0.55s 0.35s ease both; }
        .nc-anim-5 { animation: fadeInUp 0.55s 0.45s ease both; }
        .nc-anim-6 { animation: fadeInUp 0.55s 0.55s ease both; }

        /* spine hover */
        .nc-spine { transition: all 0.22s ease; cursor: pointer; }
        .nc-spine:hover { transform: translateY(-18px); filter: brightness(1.3); box-shadow: 0 -8px 24px rgba(96,165,250,0.22); }
        .nc-spine-featured { transform: translateY(-12px); }
        .nc-spine-featured:hover { transform: translateY(-24px) !important; box-shadow: 0 -12px 36px rgba(96,165,250,0.3) !important; }

        .nc-spine-tooltip {
          position:absolute; bottom:calc(100% + 10px); left:50%; transform:translateX(-50%);
          background:rgba(5,10,30,0.97); border:1px solid rgba(96,165,250,0.25);
          backdrop-filter:blur(20px); border-radius:10px; padding:0.55rem 0.8rem;
          white-space:nowrap; font-size:11px; color:#e8eaf6;
          pointer-events:none; opacity:0; transition:opacity 0.18s;
          z-index:100; min-width:140px; text-align:center;
          box-shadow:0 8px 24px rgba(0,0,0,0.5);
        }
        .nc-spine:hover .nc-spine-tooltip { opacity:1; }

        /* cards */
        .nc-card {
          background: rgba(10,20,55,0.6);
          border: 1px solid rgba(96,165,250,0.14);
          backdrop-filter: blur(14px);
          border-radius: 13px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .nc-card:hover { border-color: rgba(96,165,250,0.35); transform: translateY(-3px); }

        .nc-subj-card {
          background: rgba(10,20,55,0.6);
          border: 1px solid rgba(96,165,250,0.14);
          backdrop-filter: blur(14px);
          border-radius: 11px;
          transition: border-color 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .nc-subj-card:hover { border-color: rgba(96,165,250,0.35); transform: translateY(-3px); }

        /* pill buttons */
        .nc-btn-primary {
          display:inline-flex; align-items:center; gap:6px;
          padding:10px 22px; border-radius:22px; font-size:13px; font-weight:500;
          border:1px solid rgba(96,165,250,0.45);
          background:rgba(96,165,250,0.14); color:#60a5fa;
          backdrop-filter:blur(22px); cursor:pointer;
          transition:background 0.2s, transform 0.15s;
          font-family:'Inter',system-ui,sans-serif;
        }
        .nc-btn-primary:hover { background:rgba(96,165,250,0.24); transform:translateY(-2px); }

        .nc-btn-secondary {
          display:inline-flex; align-items:center; gap:6px;
          padding:10px 20px; border-radius:22px; font-size:13px;
          border:1px solid rgba(255,255,255,0.12);
          background:rgba(255,255,255,0.06); color:rgba(200,215,255,0.75);
          backdrop-filter:blur(22px); cursor:pointer;
          transition:background 0.2s, transform 0.15s;
          font-family:'Inter',system-ui,sans-serif;
        }
        .nc-btn-secondary:hover { background:rgba(255,255,255,0.12); transform:translateY(-2px); }

        /* section labels */
        .nc-label {
          font-size:10px; letter-spacing:1.5px; text-transform:uppercase;
          font-weight:500; color:rgba(96,165,250,0.75);
          display:block; text-align:center; margin-bottom:6px;
        }
        .nc-section-title {
          font-size:clamp(18px,3vw,24px); font-weight:300;
          letter-spacing:-0.4px; color:#e8eaf6;
          text-align:center; margin-bottom:14px;
          line-height:1.3;
        }

        /* scrollbar */
        .nc-page ::-webkit-scrollbar { width:5px; }
        .nc-page ::-webkit-scrollbar-thumb { background:rgba(96,165,250,0.2); border-radius:3px; }

        /* responsive shelf hide on very small */
        @media (max-width:480px) {
          .nc-shelf-wrap { display:none; }
        }
      `}</style>

      <div className="nc-page" style={{ minHeight: "100vh", paddingTop: "80px" }}>

        {/* ── RADIAL GLOWS ── */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0,
          background:`
            radial-gradient(ellipse 100% 55% at 50% -5%, rgba(30,60,140,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 60% 45% at 10% 80%, rgba(15,30,90,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 70%, rgba(20,40,110,0.3) 0%, transparent 55%)
          ` }} />

        <Stars />

        {/* Ceiling accent */}
        <div style={{
          position:"absolute", top:"2%", left:"20%", right:"20%", height:"4px", zIndex:1,
          background:"linear-gradient(90deg,transparent,rgba(96,165,250,0.18) 30%,rgba(147,197,253,0.25) 50%,rgba(96,165,250,0.18) 70%,transparent)",
          borderRadius:"3px", boxShadow:"0 0 60px 25px rgba(96,165,250,0.07)", pointerEvents:"none",
        }} />

        <div style={{ position:"relative", zIndex:2 }}>

          {/* ════════════════════════════════
              HERO
          ════════════════════════════════ */}
          <section style={{ textAlign:"center", padding:"3rem 1.5rem 2rem", maxWidth:"700px", margin:"0 auto" }}>

            <div className="nc-anim-1" style={{ display:"inline-flex", alignItems:"center", gap:8,
              borderRadius:18, padding:"5px 14px", fontSize:11, fontWeight:500,
              marginBottom:20, letterSpacing:"0.5px", textTransform:"uppercase",
              background:"rgba(96,165,250,0.1)", border:"1px solid rgba(96,165,250,0.25)",
              backdropFilter:"blur(14px)", color:"rgba(147,197,253,0.9)" }}>
              ✦ For all students
            </div>

            <h1 className="nc-anim-2" style={{
              fontSize:"clamp(26px,5vw,46px)", fontWeight:300, lineHeight:1.15,
              letterSpacing:"-0.7px", marginBottom:16, color:"#e8eaf6",
            }}>
              Structured Engineering Notes<br />
              for{" "}
              <span style={{ background:"linear-gradient(135deg,#93c5fd,#60a5fa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontWeight:600 }}>
                MAKAUT Students.
              </span>
            </h1>

            <p className="nc-anim-3" style={{
              fontSize:14, lineHeight:1.75, color:"rgba(200,210,240,0.65)",
              maxWidth:480, margin:"0 auto 28px", fontWeight:300,
            }}>
              A centralized academic platform focused exclusively on engineering
              subjects under MAKAUT. Access organized, handwritten, semester-wise
              notes designed to simplify revision and exam preparation.
            </p>

            <div className="nc-anim-4" style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              <button className="nc-btn-primary" onClick={handleGetStarted}>
                Get Started ↗
              </button>
              <button className="nc-btn-secondary" onClick={handleBrowseComponents}>
                Browse Notes 📂
              </button>
            </div>
          </section>

          {/* ── BOOKSHELF ── */}
          <div className="nc-anim-6 nc-shelf-wrap" style={{ position:"relative", padding:"0 1.5rem 0", minHeight:220, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
            {/* shelf glow layers */}
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"55%", background:"linear-gradient(0deg,rgba(8,14,35,0.95) 0%,rgba(6,12,28,0.7) 35%,transparent 100%)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:"28%", left:0, right:0, height:"2px", background:"linear-gradient(90deg,transparent,rgba(96,165,250,0.15) 15%,rgba(147,197,253,0.35) 50%,rgba(96,165,250,0.15) 85%,transparent)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:"27%", left:"15%", right:"15%", height:"28px", background:"radial-gradient(ellipse,rgba(96,165,250,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />
            {/* legs */}
            {[{ left:"12%" }, { right:"12%" }].map((pos, i) => (
              <div key={i} style={{ position:"absolute", bottom:0, ...pos, width:14, height:"28%", background:"linear-gradient(180deg,rgba(40,60,120,0.55),rgba(20,35,80,0.35))", borderRadius:"3px 3px 0 0", pointerEvents:"none" }} />
            ))}

            {/* spines */}
            <div style={{ display:"flex", alignItems:"flex-end", gap:6, justifyContent:"center", position:"relative", zIndex:20 }}>
              {SHELF_NOTES.map((note) => (
                <div
                  key={note.id}
                  onClick={handleBrowseComponents}
                  className={`nc-spine ${note.featured ? "nc-spine-featured" : ""}`}
                  style={{
                    width:note.width, height:note.height, background:note.color,
                    borderRadius:note.featured ? "6px 6px 0 0" : "4px 4px 0 0",
                    display:"flex", alignItems:"flex-start", justifyContent:"center",
                    padding:note.featured ? "0.9rem 0.85rem" : "10px 0 0",
                    flexShrink:0, position:"relative",
                  }}
                >
                  {note.featured ? (
                    <div style={{ textAlign:"left", width:"100%" }}>
                      <div style={{ fontSize:10, letterSpacing:"0.6px", textTransform:"uppercase", color:"rgba(96,165,250,0.75)", marginBottom:"0.4rem" }}>{note.subject}</div>
                      <div style={{ fontSize:20, fontWeight:300, lineHeight:1.2, color:"#e8eaf6", marginBottom:"0.4rem" }}>Complete<br /><strong>{note.subject}</strong></div>
                      <div style={{ fontSize:9, color:"rgba(200,215,255,0.42)", lineHeight:1.4 }}>Normalisation to<br />Transactions</div>
                      <div style={{ marginTop:"0.6rem", fontSize:9, color:"rgba(180,200,255,0.28)" }}>{note.university} · CSE · Sem {note.semester}</div>
                      <div style={{ marginTop:"0.5rem", display:"flex", alignItems:"center", gap:4 }}>
                        <span style={{ width:6, height:6, borderRadius:"50%", background:"#34d399", display:"inline-block", boxShadow:"0 0 6px rgba(52,211,153,0.8)" }} />
                        <span style={{ fontSize:9, color:"#34d399" }}>Free</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ writingMode:"vertical-rl", textOrientation:"mixed", transform:"rotate(180deg)", fontSize:9, fontWeight:500, letterSpacing:"0.4px", color:"rgba(210,225,255,0.8)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxHeight:110, padding:"0 3px" }}>{note.shortTitle}</div>
                      <div style={{ width:6, height:6, borderRadius:"50%", position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)", background:note.premium ? "#a78bfa" : "#34d399", boxShadow:note.premium ? "0 0 7px rgba(167,139,250,0.8)" : "0 0 7px rgba(52,211,153,0.8)" }} />
                      <div className="nc-spine-tooltip">
                        <strong style={{ color:"#e8eaf6" }}>{note.title}</strong>
                        <div style={{ fontSize:9, color:"rgba(200,210,240,0.6)", marginTop:2 }}>{note.university} · Sem {note.semester}</div>
                        <div style={{ fontSize:9, marginTop:4, display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
                          <span style={{ color:note.premium ? "#a78bfa" : "#34d399" }}>●</span>
                           {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                          {note.premium ? `Premium · ₹${(note as any).price}` : "Free"}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* legend */}
          <div style={{ display:"flex", justifyContent:"center", gap:18, padding:"12px 0 8px" }}>
            {[{ label:"Free note", color:"#34d399", shadow:"rgba(52,211,153,0.7)" }, { label:"Premium note", color:"#a78bfa", shadow:"rgba(167,139,250,0.7)" }].map(({ label, color, shadow }) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, color:"rgba(200,210,240,0.6)" }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:color, boxShadow:`0 0 5px ${shadow}` }} />
                {label}
              </div>
            ))}
          </div>

          {/* ════════════════════════════════
              WHAT WE PROVIDE
          ════════════════════════════════ */}
          <section style={{ padding:"3rem 1.5rem", maxWidth:700, margin:"0 auto" }}>
            <span className="nc-label">What We Provide</span>
            <h2 className="nc-section-title">What This Platform Provides</h2>

            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[
                "This platform focuses exclusively on engineering disciplines under MAKAUT. Notes are categorized by university, degree, stream, year, semester, and subject to ensure structured academic navigation.",
                "All material is organized in a semester-wise format so students can directly access subject-specific content without unnecessary clutter.",
              ].map((text, i) => (
                <div key={i} className="nc-card" style={{ padding:"1rem 1.2rem" }}>
                  <p style={{ fontSize:13, lineHeight:1.75, color:"rgba(200,210,240,0.65)", fontWeight:300 }}>{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════
              HANDWRITTEN NOTES
          ════════════════════════════════ */}
          <section style={{ padding:"1rem 1.5rem 3rem", maxWidth:700, margin:"0 auto" }}>
            <span className="nc-label">Our Focus</span>
            <h2 className="nc-section-title">Emphasis on Handwritten Academic Notes</h2>

            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[
                "The primary focus of this platform is handwritten and independently prepared notes contributed by students and teachers.",
                "Handwritten notes often reflect exam-focused preparation, simplified explanations, and practical clarity that textbooks may not always provide.",
                "The platform does not host pirated textbooks or unauthorized academic publications.",
              ].map((text, i) => (
                <div key={i} className="nc-card" style={{ padding:"1rem 1.2rem" }}>
                  <p style={{ fontSize:13, lineHeight:1.75, color:"rgba(200,210,240,0.65)", fontWeight:300 }}>{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════
              HOW IT WORKS
          ════════════════════════════════ */}
          <section style={{ padding:"1rem 1.5rem 3rem", maxWidth:700, margin:"0 auto" }}>
            <span className="nc-label">How It Works</span>
            <h2 className="nc-section-title">How It Works</h2>

            <div style={{ display:"flex", gap:1, flexWrap:"nowrap" }}>
              {[
                { n:"1", title:"Browse by Semester",  sub:"Navigate through organized filters including university, stream, semester, and subject." },
                { n:"2", title:"Review Details",       sub:"View subject descriptions and structured categorization before accessing the complete material." },
                { n:"3", title:"Download Securely",    sub:"Access downloadable content after authentication to ensure controlled academic distribution." },
              ].map((step, i, arr) => (
                <div key={step.n} style={{
                  flex:1, textAlign:"center", padding:"1rem 0.75rem",
                  background:"rgba(10,20,55,0.6)", border:"1px solid rgba(96,165,250,0.14)",
                  backdropFilter:"blur(14px)",
                  borderRadius: i===0 ? "13px 0 0 13px" : i===arr.length-1 ? "0 13px 13px 0" : "0",
                }}>
                  <div style={{ width:26,height:26,borderRadius:"50%",background:"rgba(96,165,250,0.16)",border:"1px solid rgba(96,165,250,0.35)",color:"#60a5fa",fontSize:11,fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px" }}>{step.n}</div>
                  <h3 style={{ fontSize:11, fontWeight:600, color:"#e8eaf6", marginBottom:4 }}>{step.title}</h3>
                  <p style={{ fontSize:10, lineHeight:1.55, color:"rgba(200,210,240,0.6)" }}>{step.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════
              SUBJECTS
          ════════════════════════════════ */}
          <section style={{ padding:"1rem 1.5rem 3rem" }}>
            <span className="nc-label">Browse by Stream</span>
            <h2 className="nc-section-title">What&apos;s your branch?</h2>

            <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap", maxWidth:560, margin:"0 auto" }}>
              {SUBJECTS.map((s) => (
                <div key={s.name} className="nc-subj-card" onClick={handleBrowseComponents} style={{ padding:"10px 16px", textAlign:"center", minWidth:72 }}>
                  <span style={{ fontSize:17, display:"block", marginBottom:3 }}>{s.emoji}</span>
                  <div style={{ fontSize:11, fontWeight:500, color:"#e8eaf6" }}>{s.name}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════
              ACADEMIC SCOPE
          ════════════════════════════════ */}
          <section style={{ padding:"1rem 1.5rem 3rem", maxWidth:700, margin:"0 auto" }}>
            <span className="nc-label">Academic Scope</span>
            <h2 className="nc-section-title">Academic Scope</h2>
            <div className="nc-card" style={{ padding:"1.2rem 1.4rem" }}>
              <p style={{ fontSize:13, lineHeight:1.75, color:"rgba(200,210,240,0.65)", fontWeight:300 }}>
                Currently, the platform focuses on MAKAUT engineering programs.
                Expansion to additional universities may be considered in the future
                while maintaining structured academic standards and subject accuracy.
              </p>
            </div>
          </section>

          {/* ════════════════════════════════
              CTA
          ════════════════════════════════ */}
          <div style={{ padding:"1rem 1.5rem 5rem", display:"flex", justifyContent:"center" }}>
            <div style={{
              borderRadius:18, padding:"2.5rem 2rem", textAlign:"center",
              maxWidth:460, width:"100%",
              background:"rgba(10,20,55,0.7)", border:"1px solid rgba(96,165,250,0.22)",
              backdropFilter:"blur(30px)", boxShadow:"0 8px 40px rgba(0,0,0,0.4)",
            }}>
              <h2 style={{ fontSize:"clamp(18px,3vw,22px)", fontWeight:300, letterSpacing:"-0.3px", marginBottom:8, color:"#e8eaf6" }}>
                Ready to study <strong style={{ fontWeight:600 }}>smarter?</strong> 🎯
              </h2>
              <p style={{ fontSize:12, lineHeight:1.6, marginBottom:20, color:"rgba(200,210,240,0.6)" }}>
                Join thousands of students already using NoteCraft. Free, always.
              </p>
              <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                <button className="nc-btn-primary" onClick={handleGetStarted}>Get Started ✦</button>
                <button className="nc-btn-secondary" onClick={handleBrowseComponents}>Browse Notes 📂</button>
              </div>
            </div>
          </div>

        </div>{/* /z-index wrapper */}
      </div>
    </>
  );
}