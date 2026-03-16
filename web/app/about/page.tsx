"use client";

import { useEffect, useRef } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/* ─── FLOATING PARTICLES ─── */
function Particles() {
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const el = ref.current;
    if (!el) return;
    for (let i = 0; i < 55; i++) {
      const p = document.createElement("div");
      const size = Math.random() * 2.5 + 0.5;
      p.style.cssText = `
        position:absolute;
        border-radius:50%;
        background:#fff;
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        animation:starPulse ${3 + Math.random() * 5}s ease-in-out infinite ${Math.random() * 5}s;
        --lo:${0.04 + Math.random() * 0.08};
        --hi:${0.2 + Math.random() * 0.35};
      `;
      el.appendChild(p);
    }
  }, []);
  return (
    <div
      ref={ref}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}
    />
  );
}

/* ─── MOTION CONFIG ─── */
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: d } }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.55, ease, delay: d } }),
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: (d = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.5, ease, delay: d } }),
};

/* ─── ROADMAP DATA ─── */
const roadmapItems = [
  { label: "MAKAUT notes — live",         status: "live" },
  { label: "Filter by semester & subject", status: "live" },
  { label: "Other university notes",        status: "soon" },
  { label: "Student contribution system",  status: "soon" },
  { label: "Assignment generator",         status: "planned" },
  { label: "Presentation builder",         status: "planned" },
] as const;

type RoadmapStatus = "live" | "soon" | "planned";

const statusConfig: Record<RoadmapStatus, { dot: string; label: string; pillBg: string; pillColor: string; pillBorder: string }> = {
  live:    { dot: "#22c55e", label: "Live",        pillBg: "rgba(34,197,94,0.12)",  pillColor: "#4ade80", pillBorder: "rgba(34,197,94,0.3)" },
  soon:    { dot: "#f59e0b", label: "Coming soon", pillBg: "rgba(245,158,11,0.12)", pillColor: "#fcd34d", pillBorder: "rgba(245,158,11,0.3)" },
  planned: { dot: "rgba(200,210,240,0.25)", label: "Planned", pillBg: "transparent", pillColor: "rgba(200,210,240,0.4)", pillBorder: "transparent" },
};

/* ─── MAIN COMPONENT ─── */
export default function AboutPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { openSignUp } = useClerk();

  const handleGetStarted = () => {
    if (isSignedIn) router.push("/view-notes");
    else openSignUp({ afterSignInUrl: "/view-notes", afterSignUpUrl: "/view-notes" });
  };

  return (
    <>
      <style>{`
        @keyframes starPulse {
          0%,100% { opacity: var(--lo, .06); }
          50%      { opacity: var(--hi, .28); }
        }
        @keyframes floatUp {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes glow {
          0%,100% { box-shadow: 0 0 18px rgba(96,165,250,0.15); }
          50%      { box-shadow: 0 0 36px rgba(96,165,250,0.32); }
        }

        html, body {
          background: #070c1b !important;
        }

        .ab2-wrap {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse 110% 50% at 50% -8%, rgba(25,55,140,0.6) 0%, transparent 60%),
            radial-gradient(ellipse 55% 40% at 8%  85%, rgba(14,28,90,0.4) 0%, transparent 50%),
            radial-gradient(ellipse 45% 35% at 92% 60%, rgba(18,38,110,0.35) 0%, transparent 55%),
            linear-gradient(180deg, #070c1b 0%, #050918 50%, #030610 100%);
          color: #e4e8f5;
          padding-bottom: 6rem;
        }

        .ab2-beam {
          position: absolute;
          top: 0; left: 15%; right: 15%;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(96,165,250,0.3) 40%, rgba(167,139,250,0.25) 60%, transparent);
          border-radius: 4px;
          box-shadow: 0 0 80px 30px rgba(96,165,250,0.07);
          pointer-events: none;
          z-index: 0;
        }

        .ab2-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1.75rem;
        }

        .ab2-hero {
          padding: 5rem 0 4rem;
          text-align: center;
        }

        .ab2-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(147,197,253,0.8);
          margin-bottom: 1.5rem;
        }

        .ab2-tag-line {
          width: 28px; height: 1px;
          background: rgba(147,197,253,0.5);
        }

        .ab2-hero h1 {
          font-size: clamp(36px, 5.5vw, 62px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin-bottom: 1.25rem;
          color: #eef2ff;
        }

        .ab2-hero h1 em {
          font-style: italic;
          font-weight: 500;
          color: #93c5fd;
        }

        .ab2-hero-sub {
          font-size: 16px;
          font-weight: 300;
          color: rgba(180,195,235,0.65);
          line-height: 1.8;
          max-width: 520px;
          margin: 0 auto 2rem;
        }

        .ab2-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 3.5rem 0 3rem;
        }

        .ab2-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }

        .ab2-divider-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(147,197,253,0.4);
        }

        .ab2-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(147,197,253,0.55);
          margin-bottom: 0.6rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ab2-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
          max-width: 120px;
        }

        .ab2-story {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 1.5rem;
        }

        @media (max-width: 600px) {
          .ab2-story { grid-template-columns: 1fr; }
          .ab2-roadmap-grid { grid-template-columns: 1fr !important; }
        }

        .ab2-story-text {
          font-size: 15px;
          font-weight: 300;
          color: rgba(200,210,240,0.7);
          line-height: 1.85;
        }

        .ab2-story-text strong {
          color: #c7d8f8;
          font-weight: 500;
        }

        .ab2-quote {
          border-left: 2px solid rgba(96,165,250,0.5);
          padding: 1rem 1.5rem;
          margin: 2.5rem 0;
          background: rgba(96,165,250,0.05);
          border-radius: 0 10px 10px 0;
        }

        .ab2-quote p {
          font-style: italic;
          font-size: 18px;
          color: rgba(200,215,245,0.8);
          line-height: 1.65;
        }

        .ab2-quote cite {
          display: block;
          margin-top: 0.6rem;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(147,197,253,0.6);
          font-style: normal;
        }

        .ab2-roadmap-title {
          font-size: clamp(22px, 3.5vw, 32px);
          font-weight: 500;
          color: #dde6f8;
          margin-bottom: 1.5rem;
          letter-spacing: -0.3px;
        }

        .ab2-road-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          gap: 10px;
          transition: border-color 0.2s, background 0.2s;
        }

        .ab2-road-row:hover {
          border-color: rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.04);
        }

        .ab2-founder {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          padding: 1.75rem;
          border-radius: 16px;
          border: 1px solid rgba(96,165,250,0.18);
          background: rgba(96,165,250,0.05);
          margin-top: 1.5rem;
          transition: border-color 0.25s, background 0.25s;
        }

        .ab2-founder:hover {
          border-color: rgba(96,165,250,0.35);
          background: rgba(96,165,250,0.09);
        }

        .ab2-avatar {
          width: 50px; height: 50px;
          border-radius: 50%;
          background: rgba(96,165,250,0.15);
          border: 1px solid rgba(96,165,250,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
          animation: floatUp 4s ease-in-out infinite;
        }

        .ab2-founder-name {
          font-size: 14px;
          font-weight: 600;
          color: #c7d8f8;
        }

        .ab2-founder-role {
          font-size: 11px;
          color: #60a5fa;
          margin-bottom: 0.5rem;
          letter-spacing: 0.3px;
        }

        .ab2-founder-msg {
          font-style: italic;
          font-size: 14px;
          color: rgba(190,205,235,0.7);
          line-height: 1.7;
        }

        .ab2-cta-section {
          text-align: center;
          padding: 4rem 0 1rem;
        }

        .ab2-cta-title {
          font-size: clamp(24px, 3.5vw, 38px);
          font-weight: 500;
          color: #dde6f8;
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }

        .ab2-cta-title em {
          font-style: italic;
          color: #93c5fd;
        }

        .ab2-cta-sub {
          font-size: 14px;
          font-weight: 300;
          color: rgba(180,195,235,0.5);
          margin-bottom: 1.75rem;
        }

        .ab2-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(96,165,250,0.15);
          border: 1px solid rgba(96,165,250,0.38);
          color: #93c5fd;
          padding: 11px 28px;
          border-radius: 40px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.22s;
        }

        .ab2-cta-btn:hover {
          background: rgba(96,165,250,0.28);
          border-color: rgba(96,165,250,0.6);
          transform: scale(1.04);
          box-shadow: 0 0 30px rgba(96,165,250,0.2);
        }

        .ab2-cta-btn:active { transform: scale(0.97); }

        .ab2-cta-note {
          margin-top: 0.75rem;
          font-size: 11px;
          color: rgba(180,195,235,0.3);
          letter-spacing: 0.3px;
        }
      `}</style>

      <div className="ab2-wrap">
        <Particles />
        <div className="ab2-beam" />

        <div className="ab2-content">

          {/* ── HERO ── */}
          <div className="ab2-hero">
            <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
              <div className="ab2-tag">
                <span className="ab2-tag-line" />
                Our story
                <span className="ab2-tag-line" />
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={0.1} initial="hidden" animate="visible">
              Built by a student,<br /><em>for every student.</em>
            </motion.h1>

            <motion.p className="ab2-hero-sub" variants={fadeUp} custom={0.2} initial="hidden" animate="visible">
              NoteCraft is a curated academic resource platform designed to give MAKAUT students
              organised, reliable notes — exactly when they need them.
            </motion.p>
          </div>

          {/* ── DIVIDER ── */}
          <div className="ab2-divider">
            <div className="ab2-divider-line" />
            <div className="ab2-divider-dot" />
            <div className="ab2-divider-line" />
          </div>

          {/* ── ORIGIN STORY ── */}
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="ab2-section-label">Our origin</div>
          </motion.div>

          <motion.div className="ab2-story" variants={fadeUp} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="ab2-story-text">
              Every semester, MAKAUT students face the same frustrating cycle —
              scattered Telegram groups, broken Drive links, outdated PDFs passed around
              just days before exams. <strong>Finding good notes felt like a second exam in itself.</strong>
            </p>
            <p className="ab2-story-text">
              NoteCraft was born out of that frustration. A single, clean place where
              semester-wise notes are <strong>always there</strong>, always organised, and always accessible —
              whether it&apos;s the night before a viva or the first day of a new semester.
            </p>
          </motion.div>

          <motion.div className="ab2-quote" variants={fadeLeft} custom={0.15} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p>
              &ldquo;I got tired of searching through random Telegram groups and broken Drive links
              every semester. So I built the thing I always wished existed.&rdquo;
            </p>
            <cite>— Founder, NoteCraft · MAKAUT Engineering Student</cite>
          </motion.div>

          {/* ── DIVIDER ── */}
          <div className="ab2-divider">
            <div className="ab2-divider-line" />
            <div className="ab2-divider-dot" />
            <div className="ab2-divider-line" />
          </div>

          {/* ── ROADMAP GRID ── */}
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="ab2-section-label">Where we&apos;re headed</div>
            <h2 className="ab2-roadmap-title">Our roadmap. 🗺️</h2>
          </motion.div>

          <div
            className="ab2-roadmap-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
          >
            {roadmapItems.map((item, i) => {
              const cfg = statusConfig[item.status];
              return (
                <motion.div
                  key={i}
                  className="ab2-road-row"
                  variants={fadeUp}
                  custom={i * 0.06}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: cfg.dot, flexShrink: 0,
                      boxShadow: item.status !== "planned" ? `0 0 6px ${cfg.dot}` : "none",
                    }} />
                    <span style={{ fontSize: 13, color: "rgba(200,215,245,0.75)", fontWeight: 400 }}>
                      {item.label}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: "0.4px",
                    padding: "3px 10px", borderRadius: "20px",
                    background: cfg.pillBg, color: cfg.pillColor,
                    border: `1px solid ${cfg.pillBorder}`,
                    whiteSpace: "nowrap", flexShrink: 0,
                  }}>
                    {cfg.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* ── DIVIDER ── */}
          <div className="ab2-divider">
            <div className="ab2-divider-line" />
            <div className="ab2-divider-dot" />
            <div className="ab2-divider-line" />
          </div>

          {/* ── FOUNDER ── */}
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="ab2-section-label">Behind NoteCraft</div>
          </motion.div>

          <motion.div
            className="ab2-founder"
            variants={scaleUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <div className="ab2-avatar">🧑‍💻</div>
            <div>
              <div className="ab2-founder-name">Founder, NoteCraft</div>
              <div className="ab2-founder-role">MAKAUT Engineering Student</div>
              <p className="ab2-founder-msg">
                NoteCraft is an independent project — no team, no VC funding, no corporate agenda.
                Just a student who wanted to fix a real problem and decided to do something about it.
                The goal has always been simple: make studying a little less stressful for everyone at MAKAUT,
                and eventually, for students everywhere.
              </p>
            </div>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            className="ab2-cta-section"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="ab2-cta-title">
              Ready to study <em>smarter?</em>
            </h2>
            <p className="ab2-cta-sub">
              Join thousands of MAKAUT students who already use NoteCraft to prepare for exams.
            </p>
            <motion.button
              className="ab2-cta-btn"
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Browse Notes ✦
            </motion.button>
            <p className="ab2-cta-note">Free to get started · No credit card needed</p>
          </motion.div>

        </div>
      </div>
    </>
  );
}