"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

export default function AccessDenied() {
  const router = useRouter();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        html, body { background: #080d1e !important; font-family: 'Inter', -apple-system, sans-serif; margin: 0; }
        @keyframes cn-twinkle { 0%,100%{opacity:var(--min,.08);} 50%{opacity:var(--max,.4);} }
      `}</style>

      <div style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `
          radial-gradient(ellipse 100% 55% at 50% -5%, rgba(30,60,140,0.55) 0%, transparent 65%),
          radial-gradient(ellipse 60% 45% at 10% 80%, rgba(15,30,90,0.35) 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 90% 70%, rgba(20,40,110,0.3) 0%, transparent 55%),
          linear-gradient(180deg, #080d1e 0%, #060a18 40%, #040810 100%)
        `,
        padding: "1rem",
      }}>
        <Stars />

        {/* ceiling light */}
        <div style={{
          position: "fixed", top: 0, left: "20%", right: "20%", height: 4, zIndex: 1,
          background: "linear-gradient(90deg,transparent,rgba(96,165,250,0.18) 30%,rgba(147,197,253,0.25) 50%,rgba(96,165,250,0.18) 70%,transparent)",
          borderRadius: 3, boxShadow: "0 0 60px 25px rgba(96,165,250,0.07)", pointerEvents: "none",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative", zIndex: 2,
            background: "rgba(8,15,40,0.75)",
            border: "1px solid rgba(239,68,68,0.22)",
            backdropFilter: "blur(20px)",
            borderRadius: 20,
            padding: "3rem 2.5rem",
            textAlign: "center",
            maxWidth: 420,
            width: "100%",
            boxShadow: "0 8px 48px rgba(239,68,68,0.08)",
          }}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 64, height: 64, borderRadius: "50%", margin: "0 auto 1.5rem",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.28)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28,
            }}
          >
            🚫
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
              backdropFilter: "blur(14px)", borderRadius: 18, padding: "4px 13px",
              fontSize: 10, color: "rgba(252,165,165,0.9)", fontWeight: 500,
              marginBottom: "1rem", letterSpacing: "0.5px", textTransform: "uppercase",
            }}
          >
            ✦ Restricted
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            style={{
              fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 300,
              letterSpacing: "-0.04em", color: "#e8eaf6", lineHeight: 1.2,
              margin: "0 0 0.75rem",
            }}
          >
            Access{" "}
            <span style={{
              fontStyle: "normal",
              background: "linear-gradient(135deg, #fca5a5, #f87171)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Denied
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28 }}
            style={{
              fontSize: 13, color: "rgba(200,210,240,0.55)",
              lineHeight: 1.6, margin: "0 0 2rem",
            }}
          >
            You don&apos;t have permission to access this page.
            <br />Please contact an administrator if you think this is a mistake.
          </motion.p>

          {/* Divider */}
          <div style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.15) 30%, rgba(96,165,250,0.15) 70%, transparent)",
            marginBottom: "2rem",
          }} />

          {/* Button */}
          <motion.button
            onClick={() => router.push("/home")}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.34 }}
            whileHover={{ scale: 1.03, y: -2, boxShadow: "0 6px 24px rgba(96,165,250,0.2)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: "100%", padding: "12px",
              background: "rgba(96,165,250,0.16)", border: "1px solid rgba(96,165,250,0.4)",
              color: "#60a5fa", borderRadius: 12, fontSize: 14, fontWeight: 500,
              fontFamily: "'Inter', -apple-system, sans-serif",
              cursor: "pointer", transition: "background 0.2s",
            }}
          >
            ← Go Back Home
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}