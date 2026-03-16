"use client";

import Image from "next/image";
import Link from "next/link";
import icon from "../icon.png";

export default function Footer() {
  return (
    <footer style={{
      background: "rgba(4,8,20,0.92)",
      borderTop: "1px solid rgba(96,165,250,0.12)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <div className="footer-grid">

        {/* Brand */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <Image style={{
              width: 24, height: 24, borderRadius: 7,
              background: "rgba(96,165,250,0.15)",
              border: "1px solid rgba(96,165,250,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
            }} src={icon} alt={"notecraft"}/>
            <span style={{ fontSize:15, fontWeight:600, color:"#e8eaf6", letterSpacing:"-0.02em" }}>
              NoteCraft
            </span>
          </div>
          <p style={{ fontSize:12, color:"rgba(200,210,240,0.5)", lineHeight:1.75, maxWidth:240, fontWeight:300 }}>
            Structured academic notes organized by university, semester, and subject.
          </p>
        </div>

        {/* Nav + Legal — side by side on mobile too */}
        <div className="footer-links-row">

        {/* Navigation */}
        <div>
          <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(96,165,250,0.7)", fontWeight:500, marginBottom:12 }}>
            Navigation
          </div>
          <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:8 }}>
            {[
              { label:"About",   href:"/about" },
              { label:"Blog",    href:"/blog" },
              { label:"Contact", href:"/contact" },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link href={href} style={{
                  fontSize:13, color:"rgba(200,210,240,0.55)", textDecoration:"none",
                  transition:"color 0.18s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(200,210,240,0.95)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,210,240,0.55)")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <div style={{ fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(96,165,250,0.7)", fontWeight:500, marginBottom:12 }}>
            Legal
          </div>
          <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:8 }}>
            {[
              { label:"Privacy Policy", href:"/privacy-policy" },
              { label:"Terms",          href:"/terms" },
              { label:"Copyright",      href:"/copyright-policy" },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link href={href} style={{
                  fontSize:13, color:"rgba(200,210,240,0.55)", textDecoration:"none",
                  transition:"color 0.18s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(200,210,240,0.95)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,210,240,0.55)")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p style={{ fontSize:11, color:"rgba(180,195,230,0.28)", margin:0 }}>
          © {new Date().getFullYear()} NoteCraft. All rights reserved.
        </p>
        <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:"rgba(180,195,230,0.28)" }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:"#34d399", boxShadow:"0 0 5px rgba(52,211,153,0.8)", display:"inline-block" }} />
          All systems operational
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 2.5rem;
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 2rem 1.5rem;
        }
        .footer-bottom {
          border-top: 1px solid rgba(96,165,250,0.08);
          max-width: 1100px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .footer-links-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        @media(max-width:640px){
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding: 2rem 1.25rem 1.25rem !important;
          }
          .footer-links-row {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 1rem 1.25rem !important;
            gap: 0.4rem !important;
          }
        }
      `}</style>
    </footer>
  );
}