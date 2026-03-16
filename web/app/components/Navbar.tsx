"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/view-notes" },
    { name: "About us", path: "/about" },
    { name: "Contact us", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
      <style>{`
        html, body { background: #080d1e !important; }

        .nc-nav-link {
          padding: 6px 13px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 400;
          transition: all 0.18s ease;
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          white-space: nowrap;
        }
        .nc-nav-link:hover {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.08);
        }
        .nc-nav-link.active {
          color: rgba(255, 255, 255, 0.95);
          background: rgba(255, 255, 255, 0.12);
          font-weight: 500;
        }

        /* mobile drawer links */
        .nc-drawer-link {
          display: block;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: background 0.18s, color 0.18s;
        }
        .nc-drawer-link:hover {
          background: rgba(255, 255, 255, 0.07);
          color: rgba(255, 255, 255, 0.92);
        }
        .nc-drawer-link.active {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.95);
          font-weight: 500;
        }

        /* hamburger lines */
        .nc-ham span {
          display: block;
          width: 18px;
          height: 1.5px;
          background: rgba(255,255,255,0.7);
          border-radius: 2px;
          transition: all 0.25s ease;
          transform-origin: center;
        }
        .nc-ham.open span:nth-child(1) { transform: translateY(5px) rotate(45deg); }
        .nc-ham.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nc-ham.open span:nth-child(3) { transform: translateY(-5px) rotate(-45deg); }

        /* hide links on small screens */
        @media (max-width: 600px) {
          .nc-desktop-links { display: none !important; }
          .nc-ham-btn { display: flex !important; }
        }
        @media (min-width: 601px) {
          .nc-ham-btn { display: none !important; }
          .nc-mobile-drawer { display: none !important; }
        }

        /* drawer slide-down */
        @keyframes drawerIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nc-mobile-drawer { animation: drawerIn 0.22s ease both; }
      `}</style>

      {/* ── PILL NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          width: "min(760px, 92vw)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          background: "rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "999px",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.35)",
          gap: "8px",
        }}
      >
        {/* LOGO */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            src="/icon.png"
            alt="NoteCraft Logo"
            width={28}
            height={28}
            priority
            style={{ borderRadius: "6px" }}
          />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="nc-desktop-links" style={{ display: "flex", gap: "2px", flex: 1, justifyContent: "center" }}>
          {links.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className={`nc-nav-link${pathname === path ? " active" : ""}`}
            >
              {name}
            </Link>
          ))}
        </div>

        {/* RIGHT: UserButton + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-[26px] h-[26px]",
                userButtonPopoverCard: "bg-[#080c1e] border border-[rgba(255,255,255,0.1)]",
              },
            }}
          />

          {/* HAMBURGER — mobile only */}
          <button
            className={`nc-ham-btn nc-ham${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              display: "none", // overridden by media query
              flexDirection: "column",
              gap: "3.5px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {menuOpen && (
        <div
          className="nc-mobile-drawer"
          style={{
            position: "fixed",
            top: "70px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 49,
            width: "min(760px, 92vw)",
            background: "rgba(6, 10, 24, 0.92)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {links.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className={`nc-drawer-link${pathname === path ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}