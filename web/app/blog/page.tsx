"use client";

export default function BlogPage() {
  return (
    <div className="w-[90%] md:w-[70%] mx-auto px-6 min-h-screen bg-white text-black">

      {/* HERO */}
      <section className="py-20 border-b border-gray-300 space-y-8">
        <h1 className="text-5xl font-semibold tracking-tight">
          Academic Blog
        </h1>

        <p className="text-xl text-gray-700 leading-relaxed max-w-4xl">
          A structured academic resource focused on subject-wise explanations,
          module breakdowns, and semester-oriented study guidance for engineering students.
        </p>

        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          The objective of this blog is to simplify complex academic topics,
          highlight important exam areas, and provide conceptual clarity
          beyond handwritten notes.
        </p>
      </section>

      {/* INTRO BLOCK */}
      <section className="py-16 border-b border-gray-200 space-y-6">
        <h2 className="text-2xl font-semibold">
          What You Will Find Here
        </h2>

        <div className="text-lg text-gray-700 leading-relaxed space-y-4 max-w-4xl">
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
      </section>

      {/* ARTICLES SECTION */}
      <section className="py-16 space-y-16">
        <h2 className="text-2xl font-semibold border-b border-gray-300 pb-4">
          Published Articles
        </h2>
      </section>

      {/* FOOT NOTE */}
      <section className="py-20 border-t border-gray-200">
        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
          More structured academic articles will be added progressively.
          The long-term objective is to build a comprehensive knowledge base
          that supports semester-wise preparation across subjects.
        </p>
      </section>

    </div>
  );
}