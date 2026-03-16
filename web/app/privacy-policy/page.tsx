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
      s.style.cssText = `position:absolute;border-radius:50%;background:#fff;width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:pp-twinkle ${2+Math.random()*4}s ease-in-out infinite ${Math.random()*4}s;--min:${0.05+Math.random()*0.1};--max:${0.3+Math.random()*0.5};`;
      el.appendChild(s);
    }
    return () => { if (el) el.innerHTML = ""; };
  }, []);
  return <div ref={ref} style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }} />;
}

const SECTIONS = [
  {
    label: "Information We Collect",
    h2: "Information We Collect",
    content: (
      <>
        <p>We collect only limited personal information necessary for account functionality. This includes:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
        </ul>
        <p>Authentication is handled securely by Clerk. We do not store passwords or manage authentication credentials directly.</p>
      </>
    ),
  },
  {
    label: "How We Use Information",
    h2: "How We Use Information",
    content: (
      <>
        <p>Information is used to:</p>
        <ul>
          <li>Create and manage user accounts</li>
          <li>Enable access to notes after login</li>
          <li>Provide customer support</li>
          <li>Improve platform functionality</li>
        </ul>
      </>
    ),
  },
  {
    label: "Third-Party Services",
    h2: "Third-Party Services",
    content: (
      <>
        <p>Authentication is managed by Clerk. In the future, we may use third-party services including:</p>
        <ul>
          <li>Payment gateways for paid notes</li>
          <li>Analytics tools</li>
          <li>Advertising services such as Google AdSense</li>
        </ul>
        <p>These services may collect information in accordance with their own privacy policies.</p>
      </>
    ),
  },
  {
    label: "Cookies",
    h2: "Cookies",
    content: (
      <p>This platform may use cookies for authentication and future advertising or analytics purposes. Users may manage cookie preferences through their browser settings.</p>
    ),
  },
  {
    label: "Data Security",
    h2: "Data Security",
    content: (
      <p>Reasonable technical and administrative measures are implemented to protect user information. However, no method of transmission over the internet is completely secure.</p>
    ),
  },
  {
    label: "User Rights",
    h2: "User Rights",
    content: (
      <p>Users may request account deletion or data removal by contacting us at <a href="mailto:notecraft.helpdesk@gmail.com" className="pp-link">notecraft.helpdesk@gmail.com</a>.</p>
    ),
  },
  {
    label: "Changes to This Policy",
    h2: "Changes to This Policy",
    content: (
      <p>This Privacy Policy may be updated from time to time. Continued use of the platform constitutes acceptance of the updated policy.</p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        html, body { background: #080d1e !important; font-family: 'Inter', -apple-system, sans-serif; }
        @keyframes pp-twinkle { 0%,100%{opacity:var(--min,.1);} 50%{opacity:var(--max,.6);} }

        .pp-wrap {
          padding-top: 50px;
          position:relative; overflow:hidden; color:#e8eaf6;
          background:
            radial-gradient(ellipse 100% 55% at 50% -5%, rgba(30,60,140,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 60% 45% at 10% 80%, rgba(15,30,90,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 70%, rgba(20,40,110,0.3) 0%, transparent 55%),
            linear-gradient(180deg, #080d1e 0%, #060a18 40%, #040810 100%);
        }
        .pp-ceiling {
          position:absolute; top:0; left:20%; right:20%; height:4px; z-index:0;
          background:linear-gradient(90deg,transparent,rgba(96,165,250,0.18) 30%,rgba(147,197,253,0.25) 50%,rgba(96,165,250,0.18) 70%,transparent);
          border-radius:3px; box-shadow:0 0 60px 25px rgba(96,165,250,0.07); pointer-events:none;
        }
        .pp-content {
          position:relative; z-index:1;
          max-width:760px; margin:0 auto;
          padding:2rem 1.75rem 4rem;
        }

        .pp-header {
          padding-bottom:2.5rem;
          border-bottom:1px solid rgba(96,165,250,0.12);
        }
        .pp-badge {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(96,165,250,0.1); border:1px solid rgba(96,165,250,0.25);
          backdrop-filter:blur(14px); border-radius:18px; padding:5px 13px;
          font-size:11px; color:rgba(147,197,253,.9); font-weight:500;
          margin-bottom:1rem; letter-spacing:.5px; text-transform:uppercase;
          transition:background .2s,border-color .2s,box-shadow .2s;
        }
        .pp-badge:hover{background:rgba(96,165,250,0.18);border-color:rgba(96,165,250,0.45);box-shadow:0 0 14px rgba(96,165,250,0.12);}
        .pp-header h1 {
          font-size:clamp(28px,4.5vw,46px); font-weight:300;
          letter-spacing:-0.04em; line-height:1.1; color:#e8eaf6; margin-bottom:1rem;
        }
        .pp-header h1 em {
          font-style:normal;
          background:linear-gradient(135deg,#93c5fd,#60a5fa);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .pp-header p {
          font-size:13px; color:rgba(200,210,240,0.6); line-height:1.8;
          max-width:560px; font-weight:300;
        }

        .pp-section {
          padding:2.2rem 0;
          border-bottom:1px solid rgba(96,165,250,0.08);
        }
        .pp-section:last-child { border-bottom:none; }
        .pp-label {
          font-size:10px; letter-spacing:1.5px; text-transform:uppercase;
          color:rgba(96,165,250,0.75); font-weight:500; margin-bottom:0.4rem;
        }
        .pp-section h2 {
          font-size:clamp(15px,2.2vw,21px); font-weight:400;
          letter-spacing:-0.03em; color:#e8eaf6; margin-bottom:1rem;
        }

        .pp-prose { display:flex; flex-direction:column; gap:10px; }
        .pp-prose p {
          font-size:13px; color:rgba(200,210,240,0.6); line-height:1.8;
          font-weight:300; max-width:580px;
        }

        .pp-prose ul { display:flex; flex-direction:column; gap:7px; list-style:none; padding:0; margin:0; }
        .pp-prose li {
          display:flex; align-items:center; gap:10px;
          background:rgba(10,20,55,0.55); border:1px solid rgba(96,165,250,0.12);
          backdrop-filter:blur(14px); border-radius:10px;
          padding:9px 14px; font-size:13px; color:rgba(200,210,240,0.7);
          transition:border-color 0.18s, background 0.18s, box-shadow 0.18s;
        }
        .pp-prose li:hover { border-color:rgba(96,165,250,0.32); background:rgba(96,165,250,0.08); color:rgba(200,210,240,0.9); box-shadow:0 0 14px rgba(96,165,250,0.07); }
        .pp-prose li::before {
          content:''; width:6px; height:6px; border-radius:50%; flex-shrink:0;
          background:rgba(96,165,250,0.6); box-shadow:0 0 5px rgba(96,165,250,0.4);
        }

        .pp-link {
          color:#60a5fa; text-decoration:none; font-weight:500;
          border-bottom:1px solid rgba(96,165,250,0.3);
          transition:border-color 0.18s, color 0.18s;
        }
        .pp-link:hover { color:#93c5fd; border-color:rgba(96,165,250,0.7); }

        @media(max-width:540px){ .pp-content{ padding:1.5rem 1rem 3rem; } }
      `}</style>

      <div className="pp-wrap">
        <Stars />
        <div className="pp-ceiling" />

        <div className="pp-content">

          {/* HEADER */}
          <div className="pp-header">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <div className="pp-badge">🔒 Legal</div>
            </motion.div>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible">
              Privacy <em>Policy</em>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible">
              This Privacy Policy describes how this platform collects, uses,
              and protects user information. This platform currently serves
              users within India.
            </motion.p>
          </div>

          {/* SECTIONS */}
          {SECTIONS.map((sec, i) => (
            <motion.div
              key={sec.h2}
              className="pp-section"
              custom={i + 3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="pp-label">{sec.label}</div>
              <h2>{sec.h2}</h2>
              <div className="pp-prose">{sec.content}</div>
            </motion.div>
          ))}

        </div>
      </div>
    </>
  );
}