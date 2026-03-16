"use client";

import { motion } from "framer-motion";

const fadeUp: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay: i * 0.09 },
  }),
};

export default function BlogPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        body{font-family:'Inter',-apple-system,sans-serif;background:#050814;color:#e8eaf6;overflow-x:hidden;}

        .blog-scene{
          background:
            radial-gradient(ellipse 100% 55% at 50% -5%,rgba(30,60,140,0.55) 0%,transparent 65%),
            radial-gradient(ellipse 60% 45% at 10% 80%,rgba(15,30,90,0.35) 0%,transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 70%,rgba(20,40,110,0.3) 0%,transparent 55%),
            linear-gradient(180deg,#080d1e 0%,#060a18 40%,#040810 100%);
          min-height:100vh;position:relative;padding-top:50px;}

        .ceiling-light{position:absolute;top:2%;left:20%;right:20%;height:5px;background:linear-gradient(90deg,transparent,rgba(96,165,250,0.18) 30%,rgba(147,197,253,0.25) 50%,rgba(96,165,250,0.18) 70%,transparent);border-radius:3px;box-shadow:0 0 60px 25px rgba(96,165,250,0.08);pointer-events:none;}

        .blog-wrap{position:relative;z-index:10;max-width:760px;margin:0 auto;padding:2.5rem 1.75rem 4rem;}

        .g-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(96,165,250,0.15) 30%,rgba(96,165,250,0.15) 70%,transparent);margin:2.5rem 0;}

        .blog-hero{padding-bottom:2.5rem;}
        .blog-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(96,165,250,0.1);border:1px solid rgba(96,165,250,0.25);backdrop-filter:blur(14px);border-radius:18px;padding:5px 13px;font-size:11px;color:rgba(147,197,253,.9);font-weight:500;margin-bottom:1rem;letter-spacing:.5px;text-transform:uppercase;transition:background .2s,border-color .2s,box-shadow .2s;}
        .blog-badge:hover{background:rgba(96,165,250,0.18);border-color:rgba(96,165,250,0.45);box-shadow:0 0 14px rgba(96,165,250,0.12);}
        .blog-hero h1{font-size:clamp(28px,4.5vw,44px);font-weight:300;line-height:1.18;letter-spacing:-.7px;margin-bottom:.85rem;color:#e8eaf6;}
        .blog-hero h1 em{font-style:normal;background:linear-gradient(135deg,#93c5fd,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .blog-hero-desc{font-size:14px;color:rgba(200,210,240,0.6);line-height:1.75;margin-bottom:.75rem;max-width:600px;}

        .section-label{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(96,165,250,.75);font-weight:500;margin-bottom:.5rem;}
        .section-h2{font-size:clamp(16px,2.5vw,22px);font-weight:400;letter-spacing:-.4px;margin-bottom:1rem;color:#e8eaf6;}

        .intro-prose{font-size:13px;color:rgba(200,210,240,0.6);line-height:1.8;}
        .intro-prose p{margin-bottom:.85rem;}
        .intro-prose p:last-child{margin-bottom:0;}

        .articles-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;}
        .articles-empty{background:rgba(10,20,55,0.6);border:1px solid rgba(96,165,250,0.14);backdrop-filter:blur(14px);border-radius:14px;padding:2.5rem;text-align:center;transition:border-color .22s,box-shadow .22s;}
        .articles-empty:hover{border-color:rgba(96,165,250,0.28);box-shadow:0 4px 28px rgba(96,165,250,0.07);}
        .articles-empty-emoji{font-size:32px;margin-bottom:.75rem;}
        .articles-empty-title{font-size:15px;font-weight:500;color:#e8eaf6;margin-bottom:.4rem;}
        .articles-empty-sub{font-size:12px;color:rgba(200,210,240,0.6);line-height:1.6;}

        .footnote-card{background:rgba(10,20,55,0.6);border:1px solid rgba(96,165,250,0.14);backdrop-filter:blur(14px);border-radius:14px;padding:1.5rem 1.75rem;display:flex;gap:14px;align-items:flex-start;transition:border-color .22s,box-shadow .22s;}
        .footnote-card:hover{border-color:rgba(96,165,250,0.28);box-shadow:0 4px 28px rgba(96,165,250,0.07);}
        .footnote-icon{font-size:20px;flex-shrink:0;margin-top:2px;}
        .footnote-text{font-size:13px;color:rgba(200,210,240,0.6);line-height:1.75;}
      `}</style>

      <div className="blog-scene">
        <div className="ceiling-light" />

        <div className="blog-wrap">

          {/* ── HERO ── */}
          <div className="blog-hero">

            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <div className="blog-badge">✍️ Study Corner</div>
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible">
              Academic <em>Blog</em>
            </motion.h1>

            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="blog-hero-desc">
              A structured academic resource focused on subject-wise explanations,
              module breakdowns, and semester-oriented study guidance for engineering students.
            </motion.p>

            <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible" className="blog-hero-desc" style={{ marginBottom: 0 }}>
              The objective of this blog is to simplify complex academic topics,
              highlight important exam areas, and provide conceptual clarity
              beyond handwritten notes.
            </motion.p>

          </div>

          {/* ── DIVIDER 1 ── */}
          <motion.div
            className="g-divider"
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
          />

          {/* ── WHAT YOU WILL FIND HERE ── */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: "2.5rem" }}>
            <div className="section-label">What we cover</div>
            <h2 className="section-h2">What You Will Find Here</h2>
            <div className="intro-prose">
              <p>
                Each article focuses on a specific subject or module and presents
                structured explanations aligned with university syllabus patterns.
              </p>
              <p>
                Articles may include conceptual summaries, important topics for exams,
                module-level insights, and references to complete handwritten notes
                available on the platform.
              </p>
            </div>
          </motion.div>

          {/* ── DIVIDER 2 ── */}
          <motion.div
            className="g-divider"
            custom={6} variants={fadeUp} initial="hidden" animate="visible"
          />

          {/* ── PUBLISHED ARTICLES ── */}
          <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: "2.5rem" }}>
            <div className="articles-header">
              <div>
                <div className="section-label">Published articles</div>
                <h2 className="section-h2" style={{ marginBottom: 0 }}>Published Articles</h2>
              </div>
            </div>
            <motion.div
              className="articles-empty"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="articles-empty-emoji"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
              >
                📝
              </motion.div>
              <div className="articles-empty-title">Articles coming soon</div>
              <div className="articles-empty-sub">
                Structured academic articles will be published here progressively.<br />
                Check back before your next semester.
              </div>
            </motion.div>
          </motion.div>

          {/* ── DIVIDER 3 ── */}
          <motion.div
            className="g-divider"
            custom={8} variants={fadeUp} initial="hidden" animate="visible"
          />

          {/* ── FOOTNOTE ── */}
          <motion.div
            className="footnote-card"
            custom={9} variants={fadeUp} initial="hidden" animate="visible"
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="footnote-icon">📌</div>
            <p className="footnote-text">
              More structured academic articles will be added progressively.
              The long-term objective is to build a comprehensive knowledge base
              that supports semester-wise preparation across subjects.
            </p>
          </motion.div>

        </div>
      </div>
    </>
  );
}