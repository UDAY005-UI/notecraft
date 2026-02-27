"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { openSignUp } = useClerk();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/view-notes");
    } else {
      openSignUp({
        afterSignInUrl: "/view-notes",
        afterSignUpUrl: "/view-notes",
      });
    }
  };

  const handleBrowseComponents = () => {
    router.push("/view-notes");
  };

  return (
    <div className="min-h-screen bg-white text-black">

      {/* HERO */}
      <section className="w-[90%] md:w-[70%] mx-auto py-28 text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
          Structured Engineering Notes for MAKAUT Students
        </h1>

        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          A centralized academic platform focused exclusively on engineering
          subjects under MAKAUT. Access organized, handwritten, semester-wise
          notes designed to simplify revision and exam preparation.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 pt-6">
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            Get Started
          </button>

          <button
            onClick={handleBrowseComponents}
            className="px-8 py-3 rounded-lg border border-black text-black font-medium hover:bg-black hover:text-white transition"
          >
            Browse Notes
          </button>
        </div>
      </section>

      {/* WHAT WE PROVIDE */}
      <section className="w-[90%] md:w-[70%] mx-auto py-24 border-t border-gray-200 space-y-10">
        <h2 className="text-3xl font-semibold">
          What This Platform Provides
        </h2>

        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            This platform focuses exclusively on engineering disciplines
            under MAKAUT. Notes are categorized by university, degree,
            stream, year, semester, and subject to ensure structured academic navigation.
          </p>

          <p>
            All material is organized in a semester-wise format so students
            can directly access subject-specific content without unnecessary
            clutter.
          </p>
        </div>
      </section>

      {/* HANDWRITTEN FOCUS */}
      <section className="w-[90%] md:w-[70%] mx-auto py-24 border-t border-gray-200 space-y-10">
        <h2 className="text-3xl font-semibold">
          Emphasis on Handwritten Academic Notes
        </h2>

        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            The primary focus of this platform is handwritten and independently
            prepared notes contributed by students and teachers.
          </p>

          <p>
            Handwritten notes often reflect exam-focused preparation, simplified
            explanations, and practical clarity that textbooks may not always provide.
          </p>

          <p>
            The platform does not host pirated textbooks or unauthorized academic publications.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-[90%] md:w-[70%] mx-auto py-24 border-t border-gray-200 space-y-10">
        <h2 className="text-3xl font-semibold">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-12 text-lg text-gray-700 leading-relaxed">
          <div className="space-y-4">
            <h3 className="font-medium">Browse by Semester</h3>
            <p>
              Navigate through organized filters including university,
              stream, semester, and subject.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Review Details</h3>
            <p>
              View subject descriptions and structured categorization
              before accessing the complete material.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Download Securely</h3>
            <p>
              Access downloadable content after authentication to ensure
              controlled academic distribution.
            </p>
          </div>
        </div>
      </section>

      {/* SCOPE */}
      <section className="w-[90%] md:w-[70%] mx-auto py-24 border-t border-gray-200 space-y-8">
        <h2 className="text-3xl font-semibold">
          Academic Scope
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
          Currently, the platform focuses on MAKAUT engineering programs.
          Expansion to additional universities may be considered in the future
          while maintaining structured academic standards and subject accuracy.
        </p>
      </section>

    </div>
  );
}