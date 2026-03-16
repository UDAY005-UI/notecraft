"use client";

import { useEffect, useRef } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function Stars() {
  const ref = useRef<HTMLDivElement>(null);
  const created = useRef(false);

  useEffect(() => {
    if (created.current) return;
    created.current = true;

    const el = ref.current;
    if (!el) return;

    for (let i = 0; i < 80; i++) {
      const s = document.createElement("div");
      const size = Math.random() * 2 + 0.5;

      s.style.cssText = `
        position:absolute;
        border-radius:50%;
        background:#fff;
        width:${size}px;
        height:${size}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 80}%;
        animation:twinkle ${2 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 4}s;
        --min:${0.05 + Math.random() * 0.1};
        --max:${0.3 + Math.random() * 0.5};
      `;

      el.appendChild(s);
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    />
  );
}

/* ── SHARED EASE ── */
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── VARIANTS ── */
const fadeUp: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease, delay },
  }),
};

const scaleIn: import("framer-motion").Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease, delay },
  }),
};

const slideLeft: import("framer-motion").Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease, delay },
  }),
};

export default function AboutPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { openSignUp } = useClerk();

  const handleGetStarted = () => {
    if (isSignedIn) router.push("/view-notes");
    else
      openSignUp({
        afterSignInUrl: "/view-notes",
        afterSignUpUrl: "/view-notes",
      });
  };

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%,100%{opacity:var(--min,.1);}
          50%{opacity:var(--max,.6);}
        }

        html, body {
          background:#080d1e !important;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        .ab-wrap {
          padding-top: 50px;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse 100% 55% at 50% -5%, rgba(30,60,140,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 60% 45% at 10% 80%, rgba(15,30,90,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 70%, rgba(20,40,110,0.3) 0%, transparent 55%),
            linear-gradient(180deg, #080d1e 0%, #060a18 40%, #040810 100%);
          color: #e8eaf6;
        }

        .ab-ceiling {
          position: absolute;
          top: 0;
          left: 20%;
          right: 20%;
          height: 4px;
          z-index: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(96,165,250,0.18) 30%,
            rgba(147,197,253,0.25) 50%,
            rgba(96,165,250,0.18) 70%,
            transparent
          );
          border-radius: 3px;
          box-shadow: 0 0 60px 25px rgba(96,165,250,0.07);
          pointer-events: none;
        }

        .ab-content {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
          padding: 2rem 1.75rem 3rem;
        }

        .ab-hero {
          text-align: center;
          padding-bottom: 2.5rem;
        }

        .ab-badge {
          display:inline-flex;
          align-items:center;
          gap:6px;
          background:rgba(96,165,250,0.1);
          border:1px solid rgba(96,165,250,0.25);
          backdrop-filter:blur(14px);
          border-radius:18px;
          padding:5px 13px;
          font-size:11px;
          color:rgba(147,197,253,.9);
          font-weight:500;
          margin-bottom:1rem;
          letter-spacing:.5px;
          text-transform:uppercase;
          transition: border-color .2s, background .2s, box-shadow .2s;
        }

        .ab-badge:hover {
          border-color: rgba(96,165,250,0.5);
          background: rgba(96,165,250,0.16);
          box-shadow: 0 0 14px rgba(96,165,250,0.12);
        }

        .ab-hero h1 {
          font-size:clamp(28px,4.5vw,44px);
          font-weight:300;
          line-height:1.18;
          letter-spacing:-.7px;
          margin-bottom:.85rem;
        }

        .ab-hero h1 em {
          font-style:normal;
          background:linear-gradient(135deg,#93c5fd,#60a5fa);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
        }

        .ab-hero p {
          font-size:14px;
          color:rgba(200,210,240,0.6);
          line-height:1.75;
          max-width:540px;
          margin:0 auto;
        }

        .ab-stats {
          display:flex;
          justify-content:center;
          gap:1px;
          max-width:480px;
          margin:0 auto 2.5rem;
        }

        .ab-stat {
          background:rgba(255,255,255,0.07);
          border:1px solid rgba(255,255,255,0.13);
          backdrop-filter:blur(14px);
          padding:.65rem 1.25rem;
          text-align:center;
          flex:1;
          transition: background .2s, border-color .2s, box-shadow .2s;
        }

        .ab-stat:hover {
          background: rgba(96,165,250,0.1);
          border-color: rgba(96,165,250,0.28);
          box-shadow: 0 4px 20px rgba(96,165,250,0.08);
        }

        .ab-stat-num {
          font-size:19px;
          font-weight:500;
          color:#e8eaf6;
        }

        .ab-stat-lbl {
          font-size:9px;
          color:rgba(180,195,230,0.32);
          margin-top:1px;
          letter-spacing:.4px;
          text-transform:uppercase;
        }

        .ab-founder {
          background:rgba(96,165,250,0.07);
          border:1px solid rgba(96,165,250,0.22);
          backdrop-filter:blur(14px);
          border-radius:16px;
          padding:1.5rem;
          display:flex;
          gap:1rem;
          align-items:flex-start;
          margin-bottom:2.5rem;
          transition: border-color .22s, box-shadow .22s, background .22s;
        }

        .ab-founder:hover {
          border-color: rgba(96,165,250,0.4);
          background: rgba(96,165,250,0.11);
          box-shadow: 0 6px 32px rgba(96,165,250,0.09);
        }

        .ab-avatar {
          width:48px;
          height:48px;
          border-radius:50%;
          background:rgba(96,165,250,0.18);
          border:1px solid rgba(96,165,250,0.35);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:20px;
          flex-shrink: 0;
          transition: border-color .2s, background .2s, box-shadow .2s;
        }

        .ab-founder:hover .ab-avatar {
          border-color: rgba(96,165,250,0.65);
          background: rgba(96,165,250,0.26);
          box-shadow: 0 0 18px rgba(96,165,250,0.18);
        }

        .ab-cta-wrap {
          padding:1.25rem 0 0;
          display:flex;
          justify-content:center;
        }

        .ab-cta {
          background:rgba(10,20,55,0.7);
          border:1px solid rgba(96,165,250,0.22);
          backdrop-filter:blur(30px);
          border-radius:18px;
          padding:1.75rem 1.5rem;
          text-align:center;
          max-width:460px;
          width:100%;
          transition: border-color .22s, box-shadow .22s;
        }

        .ab-cta:hover {
          border-color: rgba(96,165,250,0.38);
          box-shadow: 0 6px 40px rgba(96,165,250,0.09);
        }

        .ab-cta-btn {
          background:rgba(96,165,250,0.18);
          border:1px solid rgba(96,165,250,0.42);
          color:#60a5fa;
          padding:10px 26px;
          border-radius:20px;
          font-size:12px;
          font-weight:500;
          cursor:pointer;
          transition:all .2s;
        }

        .ab-cta-btn:hover {
          background:rgba(96,165,250,0.3);
          transform:scale(1.03);
          box-shadow:0 0 24px rgba(96,165,250,0.18);
        }
      `}</style>

      <div className="ab-wrap">
        <Stars />
        <div className="ab-ceiling" />

        <div className="ab-content">

          {/* ── HERO ── */}
          <div className="ab-hero">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              <div className="ab-badge">👋 Our story</div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              animate="visible"
            >
              About <em>This Platform</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              animate="visible"
            >
              An independently developed academic resource designed to organize
              semester-wise engineering notes in a structured and accessible format.
            </motion.p>
          </div>

          {/* ── FOUNDER CARD ── */}
          <motion.div
            className="ab-founder"
            variants={slideLeft}
            custom={0.3}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="ab-avatar"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: 0.4 }}
            >
              🧑‍💻
            </motion.div>
            <div>
              <div style={{fontSize:"14px",fontWeight:500}}>Founder, NoteCraft</div>
              <div style={{fontSize:"11px",color:"#60a5fa"}}>MAKAUT Engineering Student</div>
              <div style={{fontSize:"12px",opacity:.7,fontStyle:"italic"}}>
                &quot;I got tired of searching through random Telegram groups and broken Drive links every semester.
                So I built the thing I always wished existed.&quot;
              </div>
            </div>
          </motion.div>

          {/* ── CTA ── */}
          <div className="ab-cta-wrap">
            <motion.div
              className="ab-cta"
              variants={scaleIn}
              custom={0.45}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <motion.h2
                variants={fadeUp}
                custom={0.55}
                initial="hidden"
                animate="visible"
              >
                Ready to explore? <strong>Browse notes →</strong>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.62}
                initial="hidden"
                animate="visible"
                style={{ fontSize: "13px", color: "rgba(200,210,240,0.55)", marginBottom: "1rem" }}
              >
                Thousands of students are already using NoteCraft to prepare for exams. Free, always.
              </motion.p>
              <motion.button
                className="ab-cta-btn"
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05, boxShadow: "0 0 26px rgba(96,165,250,0.22)" }}
                whileTap={{ scale: 0.96 }}
              >
                Get Started for Free ✦
              </motion.button>
            </motion.div>
          </div>

        </div>
      </div>
    </>
  );
}