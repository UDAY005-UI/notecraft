"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const fadeUp: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: i * 0.09 },
  }),
};

function Stars() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    for (let i = 0; i < 80; i++) {
      const s = document.createElement("div");
      const size = Math.random() * 2 + 0.5;
      s.style.cssText = `position:absolute;border-radius:50%;background:#fff;width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:cp-twinkle ${2+Math.random()*4}s ease-in-out infinite ${Math.random()*4}s;--min:${0.05+Math.random()*0.1};--max:${0.3+Math.random()*0.5};`;
      el.appendChild(s);
    }
    return () => { if (el) el.innerHTML = ""; };
  }, []);
  return <div ref={ref} style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }} />;
}

export default function CopyrightPolicyPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        html, body { background: #080d1e !important; font-family: 'Inter', -apple-system, sans-serif; }
        @keyframes cp-twinkle { 0%,100%{opacity:var(--min,.1);} 50%{opacity:var(--max,.6);} }

        .cp-wrap {
          padding-top: 50px;
          position: relative; overflow: hidden; color: #e8eaf6;
          background:
            radial-gradient(ellipse 100% 55% at 50% -5%, rgba(30,60,140,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 60% 45% at 10% 80%, rgba(15,30,90,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 70%, rgba(20,40,110,0.3) 0%, transparent 55%),
            linear-gradient(180deg, #080d1e 0%, #060a18 40%, #040810 100%);
        }
        .cp-ceiling {
          position:absolute; top:0; left:20%; right:20%; height:4px; z-index:0;
          background:linear-gradient(90deg,transparent,rgba(96,165,250,0.18) 30%,rgba(147,197,253,0.25) 50%,rgba(96,165,250,0.18) 70%,transparent);
          border-radius:3px; box-shadow:0 0 60px 25px rgba(96,165,250,0.07); pointer-events:none;
        }
        .cp-content {
          position:relative; z-index:1;
          max-width:760px; margin:0 auto;
          padding:2rem 1.75rem 4rem;
        }

        .cp-header {
          padding-bottom:2.5rem;
          border-bottom:1px solid rgba(96,165,250,0.12);
        }
        .cp-badge {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(96,165,250,0.1); border:1px solid rgba(96,165,250,0.25);
          backdrop-filter:blur(14px); border-radius:18px; padding:5px 13px;
          font-size:11px; color:rgba(147,197,253,.9); font-weight:500;
          margin-bottom:1rem; letter-spacing:.5px; text-transform:uppercase;
          transition:background .2s,border-color .2s,box-shadow .2s;
        }
        .cp-badge:hover{background:rgba(96,165,250,0.18);border-color:rgba(96,165,250,0.45);box-shadow:0 0 14px rgba(96,165,250,0.12);}
        .cp-header h1 {
          font-size:clamp(28px,4.5vw,46px); font-weight:300;
          letter-spacing:-0.04em; line-height:1.1; color:#e8eaf6; margin-bottom:1rem;
        }
        .cp-header h1 em {
          font-style:normal;
          background:linear-gradient(135deg,#93c5fd,#60a5fa);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .cp-header p {
          font-size:13px; color:rgba(200,210,240,0.6); line-height:1.8;
          max-width:560px; font-weight:300;
        }

        .cp-section {
          padding:2.2rem 0;
          border-bottom:1px solid rgba(96,165,250,0.08);
        }
        .cp-section:last-child { border-bottom:none; }
        .cp-label {
          font-size:10px; letter-spacing:1.5px; text-transform:uppercase;
          color:rgba(96,165,250,0.75); font-weight:500; margin-bottom:0.4rem;
        }
        .cp-section h2 {
          font-size:clamp(16px,2.2vw,22px); font-weight:400;
          letter-spacing:-0.03em; color:#e8eaf6; margin-bottom:1rem;
        }
        .cp-section p {
          font-size:13px; color:rgba(200,210,240,0.6);
          line-height:1.8; font-weight:300; max-width:580px;
        }

        .cp-list { display:flex; flex-direction:column; gap:8px; margin-top:1rem; }
        .cp-item {
          display:flex; align-items:center; gap:10px;
          background:rgba(10,20,55,0.55); border:1px solid rgba(96,165,250,0.12);
          backdrop-filter:blur(14px); border-radius:10px;
          padding:10px 14px; font-size:13px; color:rgba(200,210,240,0.7);
          transition:border-color 0.18s, background 0.18s, box-shadow 0.18s;
        }
        .cp-item:hover { border-color:rgba(96,165,250,0.32); background:rgba(96,165,250,0.08); color:rgba(200,210,240,0.9); box-shadow:0 0 14px rgba(96,165,250,0.07); }
        .cp-dot {
          width:6px; height:6px; border-radius:50%;
          background:rgba(96,165,250,0.6); box-shadow:0 0 5px rgba(96,165,250,0.4); flex-shrink:0;
        }

        .cp-email {
          display:inline-flex; align-items:center; gap:8px;
          margin-top:1.25rem;
          background:rgba(96,165,250,0.08); border:1px solid rgba(96,165,250,0.22);
          backdrop-filter:blur(14px); border-radius:10px;
          padding:10px 16px; font-size:13px; font-weight:500; color:#60a5fa;
          text-decoration:none; transition:background 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .cp-email:hover { background:rgba(96,165,250,0.16); border-color:rgba(96,165,250,0.42); box-shadow:0 0 18px rgba(96,165,250,0.12); }
        .cp-email svg { width:14px; height:14px; stroke:#60a5fa; fill:none; stroke-width:2; flex-shrink:0; }

        .cp-action-pill {
          display:inline-flex; align-items:center; gap:6px;
          margin-top:1rem;
          background:rgba(167,139,250,0.1); border:1px solid rgba(167,139,250,0.25);
          border-radius:100px; padding:6px 14px;
          font-size:12px; font-weight:500; color:#a78bfa;
        }
        .cp-action-dot {
          width:6px; height:6px; border-radius:50%;
          background:#a78bfa; box-shadow:0 0 6px rgba(167,139,250,0.8);
        }

        @media(max-width:540px){ .cp-content{ padding:1.5rem 1rem 3rem; } }
      `}</style>

      <div className="cp-wrap">
        <Stars />
        <div className="cp-ceiling" />

        <div className="cp-content">

          {/* HEADER */}
          <div className="cp-header">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <div className="cp-badge">⚖️ Legal</div>
            </motion.div>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible">
              Copyright &amp; <em>Content Policy</em>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible">
              We respect intellectual property rights and are committed to
              addressing valid copyright concerns.
            </motion.p>
          </div>

          {/* NATURE OF CONTENT */}
          <motion.div className="cp-section" custom={3} variants={fadeUp} initial="hidden" animate="visible">
            <div className="cp-label">Nature of Content</div>
            <h2>Nature of Content</h2>
            <p>
              All notes hosted on this platform are handwritten or independently
              prepared academic materials voluntarily contributed by students
              or teachers.
            </p>
          </motion.div>

          {/* REPORTING */}
          <motion.div className="cp-section" custom={4} variants={fadeUp} initial="hidden" animate="visible">
            <div className="cp-label">Reporting Copyright Concerns</div>
            <h2>Reporting Copyright Concerns</h2>
            <p>If you believe any content infringes upon your copyright, please send an email including:</p>
            <div className="cp-list">
              {[
                "Your full name and contact information",
                "Identification of the content in question",
                "Proof of ownership or authority",
                "A clear explanation of the concern",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  className="cp-item"
                  custom={5 + i} variants={fadeUp} initial="hidden" animate="visible"
                  whileHover={{ x: 4, transition: { duration: 0.18 } }}
                >
                  <div className="cp-dot" />
                  {item}
                </motion.div>
              ))}
            </div>
            <motion.a
              href="mailto:notecraft.helpdesk@gmail.com"
              className="cp-email"
              custom={9} variants={fadeUp} initial="hidden" animate="visible"
              whileHover={{ y: -2, scale: 1.02, transition: { duration: 0.18 } }}
              whileTap={{ scale: 0.97 }}
            >
              <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
              notecraft.helpdesk@gmail.com
            </motion.a>
          </motion.div>

          {/* REVIEW & ACTION */}
          <motion.div className="cp-section" custom={10} variants={fadeUp} initial="hidden" animate="visible">
            <div className="cp-label">Review & Action</div>
            <h2>Review &amp; Action</h2>
            <p>
              Upon receiving a valid complaint, we will review the request and
              take appropriate action, which may include removal of the content.
            </p>
            <motion.div
              className="cp-action-pill"
              custom={11} variants={fadeUp} initial="hidden" animate="visible"
            >
              <div className="cp-action-dot" />
              Content may be removed upon valid request
            </motion.div>
          </motion.div>

        </div>
      </div>
    </>
  );
}