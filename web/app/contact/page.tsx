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
      s.style.cssText = `position:absolute;border-radius:50%;background:#fff;width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:twinkle ${2+Math.random()*4}s ease-in-out infinite ${Math.random()*4}s;--min:${0.05+Math.random()*0.1};--max:${0.3+Math.random()*0.5};`;
      el.appendChild(s);
    }
    return () => { if (el) el.innerHTML = ""; };
  }, []);
  return <div ref={ref} style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }} />;
}

export default function ContactPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        html, body { background: #080d1e !important; font-family: 'Inter', -apple-system, sans-serif; }
        @keyframes twinkle { 0%,100%{opacity:var(--min,.1);} 50%{opacity:var(--max,.6);} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(18px);} to{opacity:1;transform:translateY(0);} }

        .ct-wrap {
          padding-top: 50px;
          position: relative;
          overflow: hidden;
          color: #e8eaf6;
          background:
            radial-gradient(ellipse 100% 55% at 50% -5%, rgba(30,60,140,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 60% 45% at 10% 80%, rgba(15,30,90,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 70%, rgba(20,40,110,0.3) 0%, transparent 55%),
            linear-gradient(180deg, #080d1e 0%, #060a18 40%, #040810 100%);
        }
        .ct-ceiling {
          position:absolute; top:0; left:20%; right:20%; height:4px; z-index:0;
          background:linear-gradient(90deg,transparent,rgba(96,165,250,0.18) 30%,rgba(147,197,253,0.25) 50%,rgba(96,165,250,0.18) 70%,transparent);
          border-radius:3px; box-shadow:0 0 60px 25px rgba(96,165,250,0.07); pointer-events:none;
        }

        .ct-content {
          position: relative; z-index: 1;
          max-width: 760px; margin: 0 auto;
          padding: 2rem 1.75rem 4rem;
        }

        /* header */
        .ct-header {
          padding-bottom: 2.5rem;
          border-bottom: 1px solid rgba(96,165,250,0.12);
          margin-bottom: 0;
          animation: fadeInUp 0.5s 0.05s ease both;
        }
        .ct-badge {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(96,165,250,0.1); border:1px solid rgba(96,165,250,0.25);
          backdrop-filter:blur(14px); border-radius:18px; padding:5px 13px;
          font-size:11px; color:rgba(147,197,253,.9); font-weight:500;
          margin-bottom:1rem; letter-spacing:.5px; text-transform:uppercase;
        }
        .ct-header h1 {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 300; letter-spacing: -0.04em; line-height: 1.1;
          color: #e8eaf6; margin-bottom: 1rem;
        }
        .ct-header h1 em {
          font-style: normal;
          background: linear-gradient(135deg,#93c5fd,#60a5fa);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ct-header p {
          font-size: 14px; color: rgba(200,210,240,0.6);
          line-height: 1.75; max-width: 560px; font-weight: 300;
        }

        /* sections */
        .ct-section {
          padding: 2.2rem 0;
          border-bottom: 1px solid rgba(96,165,250,0.08);
          animation: fadeInUp 0.5s ease both;
        }
        .ct-section:last-child { border-bottom: none; }

        .ct-label {
          font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(96,165,250,0.75); font-weight: 500; margin-bottom: 0.4rem;
        }
        .ct-section h2 {
          font-size: clamp(16px, 2.2vw, 22px);
          font-weight: 400; letter-spacing: -0.03em;
          color: #e8eaf6; margin-bottom: 1rem;
        }
        .ct-section p {
          font-size: 13px; color: rgba(200,210,240,0.6);
          line-height: 1.8; font-weight: 300; max-width: 580px;
        }

        /* email link */
        .ct-email {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 1.1rem;
          background: rgba(96,165,250,0.08);
          border: 1px solid rgba(96,165,250,0.22);
          backdrop-filter: blur(14px);
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 13px; font-weight: 500;
          color: #60a5fa;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .ct-email:hover {
          background: rgba(96,165,250,0.16);
          border-color: rgba(96,165,250,0.42);
          transform: translateY(-2px);
        }
        .ct-email svg { width:14px; height:14px; stroke:#60a5fa; fill:none; stroke-width:2; flex-shrink:0; }

        /* list */
        .ct-list {
          margin-top: 1rem;
          display: flex; flex-direction: column; gap: 8px;
        }
        .ct-list-item {
          display: flex; align-items: center; gap: 10px;
          background: rgba(10,20,55,0.55);
          border: 1px solid rgba(96,165,250,0.12);
          backdrop-filter: blur(14px);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px; color: rgba(200,210,240,0.7);
          transition: border-color 0.18s, background 0.18s;
        }
        .ct-list-item:hover {
          border-color: rgba(96,165,250,0.28);
          background: rgba(96,165,250,0.08);
          color: rgba(200,210,240,0.9);
        }
        .ct-list-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(96,165,250,0.6);
          box-shadow: 0 0 5px rgba(96,165,250,0.4);
          flex-shrink: 0;
        }

        /* response time pill */
        .ct-response-pill {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 1rem;
          background: rgba(52,211,153,0.1);
          border: 1px solid rgba(52,211,153,0.25);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 12px; font-weight: 500; color: #34d399;
        }
        .ct-response-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #34d399; box-shadow: 0 0 6px rgba(52,211,153,0.8);
          animation: twinkle 2s ease-in-out infinite;
        }

        @media(max-width:540px){
          .ct-content { padding: 1.5rem 1rem 3rem; }
        }
      `}</style>

      <div className="ct-wrap">
        <Stars />
        <div className="ct-ceiling" />

        <div className="ct-content">

          {/* HEADER */}
          <div className="ct-header">
            <div className="ct-badge">✉️ Get in touch</div>
            <h1>Contact <em>Us</em></h1>
            <p>
              For academic inquiries, copyright concerns, technical issues,
              or general feedback, please use the contact information below.
            </p>
          </div>

          {/* GENERAL INQUIRIES */}
          <div className="ct-section" style={{ animationDelay: "0.1s" }}>
            <div className="ct-label">General Inquiries</div>
            <h2>General Inquiries</h2>
            <p>For questions regarding notes, subject coverage, or platform usage:</p>
            <a href="mailto:notecraft.helpdesk@gmail.com" className="ct-email">
              <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
              notecraft.helpdesk@gmail.com
            </a>
          </div>

          {/* COPYRIGHT */}
          <div className="ct-section" style={{ animationDelay: "0.2s" }}>
            <div className="ct-label">Copyright & Content Concerns</div>
            <h2>Copyright & Content Concerns</h2>
            <p>
              If you believe any content infringes intellectual property rights,
              please include the following in your email:
            </p>
            <div className="ct-list">
              {[
                "Your full name and contact information",
                "Identification of the content in question",
                "Proof of ownership or authority",
                "A brief explanation of the concern",
              ].map((item) => (
                <div key={item} className="ct-list-item">
                  <div className="ct-list-dot" />
                  {item}
                </div>
              ))}
            </div>
            <a href="mailto:notecraft.helpdesk@gmail.com" className="ct-email" style={{ marginTop: "1.25rem" }}>
              <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
              notecraft.helpdesk@gmail.com
            </a>
          </div>

          {/* RESPONSE TIME */}
          <div className="ct-section" style={{ animationDelay: "0.3s" }}>
            <div className="ct-label">Response Time</div>
            <h2>Response Time</h2>
            <p>We aim to respond to all legitimate inquiries within 7 business days.</p>
            <div className="ct-response-pill">
              <div className="ct-response-dot" />
              Typically within 7 business days
            </div>
          </div>

        </div>
      </div>
    </>
  );
}