"use client";

import { useEffect, useRef } from "react";

function Stars() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    for (let i = 0; i < 80; i++) {
      const s = document.createElement("div");
      const size = Math.random() * 2 + 0.5;
      s.style.cssText = `position:absolute;border-radius:50%;background:#fff;width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:tm-twinkle ${2+Math.random()*4}s ease-in-out infinite ${Math.random()*4}s;--min:${0.05+Math.random()*0.1};--max:${0.3+Math.random()*0.5};`;
      el.appendChild(s);
    }
    return () => { if (el) el.innerHTML = ""; };
  }, []);
  return <div ref={ref} style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }} />;
}

const SECTIONS = [
  {
    label: "Acceptance",
    h2: "Acceptance of Terms",
    delay: "0.1s",
    content: (
      <p>By accessing or using NoteCraft, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform. These terms apply to all visitors and users of the platform.</p>
    ),
  },
  {
    label: "Who Can Use",
    h2: "Who Can Use NoteCraft",
    delay: "0.15s",
    content: (
      <p>NoteCraft is open to all students. There is no minimum age restriction, however the platform is intended for academic use by engineering students. By using the platform, you represent that you are a student accessing notes for genuine academic purposes.</p>
    ),
  },
  {
    label: "Free & Paid Notes",
    h2: "Free & Paid Notes",
    delay: "0.2s",
    content: (
      <>
        <p>NoteCraft offers both free and paid notes. Free notes are available to all registered users at no cost. Paid notes require a one-time purchase to access.</p>
        <p>All notes — free and paid — are reviewed and verified by the NoteCraft team before being published on the platform. We take accuracy seriously and do not publish content that has not been checked against the relevant syllabus.</p>
        <p>However, syllabuses change. We strongly recommend that users cross-check downloaded notes against their institution&apos;s current syllabus before relying on them for exam preparation.</p>
      </>
    ),
  },
  {
    label: "Refund Policy",
    h2: "Refund Policy",
    delay: "0.25s",
    content: (
      <>
        <p>If you have purchased a paid note and believe the content does not match the described subject or contains a material error, you are entitled to a full refund. Please contact us within 2 days of purchase with your order details and a description of the concern.</p>
        <p>Free notes are provided as-is. We encourage users to verify free content against their syllabus before use. No refund applies to free notes as no payment is made.</p>
      </>
    ),
  },
  {
    label: "Content & Intellectual Property",
    h2: "Content & Intellectual Property",
    delay: "0.3s",
    content: (
      <>
        <p>All notes published on NoteCraft are original handwritten or independently prepared academic materials. The platform does not host pirated textbooks or unauthorized copyrighted publications.</p>
        <p>The content available on NoteCraft is the intellectual property of its respective contributors and the platform. You may not reproduce, redistribute, resell, or publicly share any notes downloaded from the platform without explicit written permission.</p>
      </>
    ),
  },
  {
    label: "Prohibited Conduct",
    h2: "Prohibited Conduct",
    delay: "0.35s",
    content: (
      <>
        <p>Users agree not to:</p>
        <ul>
          <li>Share, redistribute, or resell downloaded notes</li>
          <li>Attempt to access content without proper authentication</li>
          <li>Use the platform for any purpose other than personal academic study</li>
          <li>Submit false information during registration</li>
          <li>Attempt to disrupt or interfere with the platform&apos;s operation</li>
        </ul>
      </>
    ),
  },
  {
    label: "Account Termination",
    h2: "Account Termination",
    delay: "0.4s",
    content: (
      <p>NoteCraft reserves the right to suspend or permanently terminate any user account at its discretion if a user is found to be in violation of these terms — including but not limited to redistribution of paid content, misuse of the platform, or fraudulent activity. In the case of a terminated account with unused paid purchases, a refund will be assessed on a case-by-case basis.</p>
    ),
  },
  {
    label: "Future Changes",
    h2: "Platform Expansion & Future Changes",
    delay: "0.45s",
    content: (
      <p>NoteCraft is currently focused on MAKAUT engineering students. We plan to expand to additional universities and may introduce new features such as student note contributions in the future. Any changes to how the platform operates will be reflected in updated terms, and continued use of the platform constitutes acceptance of those updates.</p>
    ),
  },
  {
    label: "Changes to Terms",
    h2: "Changes to These Terms",
    delay: "0.5s",
    content: (
      <p>These Terms of Service may be updated from time to time. We will not notify users individually of changes. It is your responsibility to review these terms periodically. Continued use of NoteCraft after changes are posted constitutes your acceptance of the revised terms.</p>
    ),
  },
  {
    label: "Contact",
    h2: "Contact",
    delay: "0.55s",
    content: (
      <p>For questions about these terms, refund requests, or any other concerns, please contact us at <a href="mailto:notecraft.helpdesk@gmail.com" className="tm-link">notecraft.helpdesk@gmail.com</a>.</p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        html, body { background: #080d1e !important; font-family: 'Inter', -apple-system, sans-serif; }
        @keyframes tm-twinkle { 0%,100%{opacity:var(--min,.1);} 50%{opacity:var(--max,.6);} }
        @keyframes tm-fadeup  { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }

        .tm-wrap {
          padding-top: 50px;
          position:relative; overflow:hidden; color:#e8eaf6;
          background:
            radial-gradient(ellipse 100% 55% at 50% -5%, rgba(30,60,140,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 60% 45% at 10% 80%, rgba(15,30,90,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 70%, rgba(20,40,110,0.3) 0%, transparent 55%),
            linear-gradient(180deg, #080d1e 0%, #060a18 40%, #040810 100%);
        }
        .tm-ceiling {
          position:absolute; top:0; left:20%; right:20%; height:4px; z-index:0;
          background:linear-gradient(90deg,transparent,rgba(96,165,250,0.18) 30%,rgba(147,197,253,0.25) 50%,rgba(96,165,250,0.18) 70%,transparent);
          border-radius:3px; box-shadow:0 0 60px 25px rgba(96,165,250,0.07); pointer-events:none;
        }
        .tm-content {
          position:relative; z-index:1;
          max-width:760px; margin:0 auto;
          padding:2rem 1.75rem 4rem;
        }

        .tm-header {
          padding-bottom:2.5rem;
          border-bottom:1px solid rgba(96,165,250,0.12);
          animation: tm-fadeup 0.5s 0.05s ease both;
        }
        .tm-badge {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(96,165,250,0.1); border:1px solid rgba(96,165,250,0.25);
          backdrop-filter:blur(14px); border-radius:18px; padding:5px 13px;
          font-size:11px; color:rgba(147,197,253,.9); font-weight:500;
          margin-bottom:1rem; letter-spacing:.5px; text-transform:uppercase;
        }
        .tm-header h1 {
          font-size:clamp(28px,4.5vw,46px); font-weight:300;
          letter-spacing:-0.04em; line-height:1.1; color:#e8eaf6; margin-bottom:1rem;
        }
        .tm-header h1 em {
          font-style:normal;
          background:linear-gradient(135deg,#93c5fd,#60a5fa);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .tm-header p {
          font-size:13px; color:rgba(200,210,240,0.6); line-height:1.8;
          max-width:560px; font-weight:300;
        }
        .tm-updated {
          display:inline-flex; align-items:center; gap:6px;
          margin-top:1rem;
          background:rgba(52,211,153,0.08); border:1px solid rgba(52,211,153,0.2);
          border-radius:100px; padding:4px 12px;
          font-size:11px; color:rgba(52,211,153,0.8); font-weight:400;
        }
        .tm-updated-dot {
          width:5px; height:5px; border-radius:50%;
          background:#34d399; box-shadow:0 0 5px rgba(52,211,153,0.8);
        }

        .tm-section {
          padding:2.2rem 0;
          border-bottom:1px solid rgba(96,165,250,0.08);
          animation: tm-fadeup 0.5s ease both;
        }
        .tm-section:last-child { border-bottom:none; }
        .tm-label {
          font-size:10px; letter-spacing:1.5px; text-transform:uppercase;
          color:rgba(96,165,250,0.75); font-weight:500; margin-bottom:0.4rem;
        }
        .tm-section h2 {
          font-size:clamp(15px,2.2vw,21px); font-weight:400;
          letter-spacing:-0.03em; color:#e8eaf6; margin-bottom:1rem;
        }

        .tm-prose { display:flex; flex-direction:column; gap:10px; }
        .tm-prose p {
          font-size:13px; color:rgba(200,210,240,0.6); line-height:1.8;
          font-weight:300; max-width:580px;
        }
        .tm-prose ul { display:flex; flex-direction:column; gap:7px; list-style:none; padding:0; margin:0; }
        .tm-prose li {
          display:flex; align-items:center; gap:10px;
          background:rgba(10,20,55,0.55); border:1px solid rgba(96,165,250,0.12);
          backdrop-filter:blur(14px); border-radius:10px;
          padding:9px 14px; font-size:13px; color:rgba(200,210,240,0.7);
          transition:border-color 0.18s, background 0.18s;
        }
        .tm-prose li:hover { border-color:rgba(96,165,250,0.28); background:rgba(96,165,250,0.08); color:rgba(200,210,240,0.9); }
        .tm-prose li::before {
          content:''; width:6px; height:6px; border-radius:50%; flex-shrink:0;
          background:rgba(96,165,250,0.6); box-shadow:0 0 5px rgba(96,165,250,0.4);
        }
        .tm-link {
          color:#60a5fa; text-decoration:none; font-weight:500;
          border-bottom:1px solid rgba(96,165,250,0.3);
          transition:border-color 0.18s, color 0.18s;
        }
        .tm-link:hover { color:#93c5fd; border-color:rgba(96,165,250,0.7); }

        @media(max-width:540px){ .tm-content{ padding:1.5rem 1rem 3rem; } }
      `}</style>

      <div className="tm-wrap">
        <Stars />
        <div className="tm-ceiling" />

        <div className="tm-content">

          <div className="tm-header">
            <div className="tm-badge">📄 Legal</div>
            <h1>Terms of <em>Service</em></h1>
            <p>
              Please read these terms carefully before using NoteCraft. By using the platform,
              you agree to be bound by these terms.
            </p>
            <div className="tm-updated">
              <div className="tm-updated-dot" />
              Effective March 2026
            </div>
          </div>

          {SECTIONS.map((sec) => (
            <div key={sec.h2} className="tm-section" style={{ animationDelay: sec.delay }}>
              <div className="tm-label">{sec.label}</div>
              <h2>{sec.h2}</h2>
              <div className="tm-prose">{sec.content}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}