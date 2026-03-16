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
const roadmap = [
  {
    phase: "Now",
    color: "#22c55e",
    title: "MAKAUT Engineering",
    desc: "Semester-wise notes for all years of MAKAUT B.Tech — curated, structured, and always accessible.",
    status: "live",
  },
  {
    phase: "Next",
    color: "#60a5fa",
    title: "Student Uploads",
    desc: "Let students contribute their own notes and resources — building a collaborative knowledge base for everyone.",
    status: "building",
  },
  {
    phase: "Soon",
    color: "#a78bfa",
    title: "More Universities",
    desc: "Expanding to other West Bengal universities and eventually all major Indian engineering colleges.",
    status: "planned",
  },
  {
    phase: "Vision",
    color: "#f59e0b",
    title: "Beyond Engineering",
    desc: "Opening up to other degrees — Science, Commerce, Management — so every student has a reliable study companion.",
    status: "vision",
  },
];

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
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
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

        /* ── WRAPPER ── */
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

        /* ── DECORATIVE TOP BEAM ── */
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

        /* ── CONTENT ── */
        .ab2-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1.75rem;
        }

        /* ── HERO ── */
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

        /* ── DIVIDER ── */
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

        /* ── SECTION LABEL ── */
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

        /* ── ORIGIN STORY ── */
        .ab2-story {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 1.5rem;
        }

        @media (max-width: 600px) {
          .ab2-story { grid-template-columns: 1fr; }
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

        /* ── PULLQUOTE ── */
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

        /* ── FREE / PREMIUM ── */
        .ab2-plans {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        @media (max-width: 500px) {
          .ab2-plans { grid-template-columns: 1fr; }
        }

        .ab2-plan {
          padding: 1.5rem;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .ab2-plan:hover {
          border-color: rgba(255,255,255,0.14);
        }

        .ab2-plan.premium {
          border-color: rgba(96,165,250,0.25);
          background: rgba(96,165,250,0.06);
          animation: glow 4s ease-in-out infinite;
        }

        .ab2-plan-badge {
          display: inline-block;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 20px;
          margin-bottom: 0.75rem;
        }

        .ab2-plan-badge.free    { background: rgba(34,197,94,0.15); color: #4ade80; border: 1px solid rgba(34,197,94,0.25); }
        .ab2-plan-badge.premium { background: rgba(96,165,250,0.18); color: #93c5fd; border: 1px solid rgba(96,165,250,0.3); }

        .ab2-plan h4 { font-size: 17px; font-weight: 600; color: #dde6f8; margin-bottom: 0.5rem; }
        .ab2-plan p  { font-size: 13px; font-weight: 300; color: rgba(180,195,235,0.6); line-height: 1.65; }

        /* ── ROADMAP ── */
        .ab2-roadmap {
          margin-top: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .ab2-road-item {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
          padding: 1.25rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.2s;
        }

        .ab2-road-item:last-child { border-bottom: none; }

        .ab2-road-left {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding-top: 3px;
        }

        .ab2-road-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          border: 1.5px solid;
          flex-shrink: 0;
        }

        .ab2-road-track {
          width: 1px; height: 100%;
          min-height: 30px;
          background: rgba(255,255,255,0.07);
        }

        .ab2-road-item:last-child .ab2-road-track { display: none; }

        .ab2-road-phase {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          min-width: 40px;
          padding-top: 2px;
        }

        .ab2-road-body h4 {
          font-size: 15px;
          font-weight: 600;
          color: #cdd9f5;
          margin-bottom: 0.3rem;
        }

        .ab2-road-body p {
          font-size: 13px;
          font-weight: 300;
          color: rgba(180,195,235,0.55);
          line-height: 1.65;
        }

        .ab2-road-pill {
          margin-top: 0.4rem;
          display: inline-block;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 10px;
        }

        /* ── FOUNDER ── */
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

        /* ── CTA ── */
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

          {/* ── FREE & PREMIUM ── */}
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="ab2-section-label">Access model</div>
          </motion.div>

          <motion.div className="ab2-plans" variants={fadeUp} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="ab2-plan">
              <span className="ab2-plan-badge free">Free</span>
              <h4>Always free, always open</h4>
              <p>
                Core notes for every semester are completely free — no sign-up walls,
                no paywalls on the essentials. Every student deserves access to the basics.
              </p>
            </div>
            <div className="ab2-plan premium">
              <span className="ab2-plan-badge premium">Premium</span>
              <h4>Go deeper with Premium</h4>
              <p>
                Unlock curated premium notes — more detailed, more exam-focused,
                and carefully put together for students who want that extra edge.
              </p>
            </div>
          </motion.div>

          {/* ── DIVIDER ── */}
          <div className="ab2-divider">
            <div className="ab2-divider-line" />
            <div className="ab2-divider-dot" />
            <div className="ab2-divider-line" />
          </div>

          {/* ── ROADMAP ── */}
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="ab2-section-label">Where we&apos;re headed</div>
          </motion.div>

          <div className="ab2-roadmap">
            {roadmap.map((item, i) => {
              const pillStyles: Record<string, { bg: string; color: string; border: string }> = {
                live:     { bg: "rgba(34,197,94,0.12)",  color: "#4ade80", border: "rgba(34,197,94,0.25)" },
                building: { bg: "rgba(96,165,250,0.12)", color: "#93c5fd", border: "rgba(96,165,250,0.25)" },
                planned:  { bg: "rgba(167,139,250,0.12)",color: "#c4b5fd", border: "rgba(167,139,250,0.25)" },
                vision:   { bg: "rgba(245,158,11,0.12)", color: "#fcd34d", border: "rgba(245,158,11,0.25)" },
              };
              const pill = pillStyles[item.status];
              return (
                <motion.div
                  className="ab2-road-item"
                  key={item.phase}
                  variants={fadeLeft}
                  custom={i * 0.08}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="ab2-road-left">
                    <div
                      className="ab2-road-dot"
                      style={{ borderColor: item.color, background: `${item.color}22` }}
                    />
                    <div className="ab2-road-track" />
                  </div>
                  <div style={{ flex: 1, paddingBottom: "0.5rem" }}>
                    <div className="ab2-road-phase" style={{ color: item.color }}>{item.phase}</div>
                    <div className="ab2-road-body">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                      <span
                        className="ab2-road-pill"
                        style={{ background: pill.bg, color: pill.color, border: `1px solid ${pill.border}` }}
                      >
                        {item.status === "live" ? "Live now" : item.status === "building" ? "In consideration" : item.status === "planned" ? "Planned" : "Long-term vision"}
                      </span>
                    </div>
                  </div>
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