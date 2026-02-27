"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="w-[90%] md:w-[70%] mx-auto px-6 py-24 space-y-28">

        {/* HEADER */}
        <section className="space-y-8">
          <h1 className="text-5xl font-semibold tracking-tight">
            About This Platform
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            An independently developed academic resource designed to organize
            semester-wise engineering notes in a structured and accessible format.
          </p>
        </section>

        {/* PURPOSE */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">
            Our Purpose
          </h2>

          <div className="text-lg text-gray-700 leading-relaxed space-y-6">
            <p>
              This platform is currently focused on supporting students under
              MAKAUT and is structured to expand to additional universities in
              the future while maintaining consistent academic standards.
            </p>

            <p>
              The objective is to centralize handwritten and contributor-based
              notes into a categorized system that simplifies revision and exam
              preparation.
            </p>
          </div>
        </section>

        {/* STRUCTURE */}
        <section className="space-y-10">
          <h2 className="text-2xl font-semibold">
            Structured Academic Organization
          </h2>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
            {[
              {
                title: "University-Level Categorization",
                text: "Notes are organized by university to ensure syllabus alignment and academic relevance.",
              },
              {
                title: "Degree & Stream Filtering",
                text: "Students can filter content by degree and stream for focused academic navigation.",
              },
              {
                title: "Year & Semester Segmentation",
                text: "Material is grouped semester-wise to support structured preparation.",
              },
              {
                title: "Subject-Specific Classification",
                text: "Each note is tagged by subject for efficient and precise retrieval.",
              },
            ].map((item) => (
              <div key={item.title} className="space-y-3">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SOURCE */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">
            Source of Notes
          </h2>

          <div className="text-lg text-gray-700 leading-relaxed space-y-6">
            <p>
              All notes available on this platform are handwritten or
              individually prepared academic materials created by students and
              teachers who voluntarily contribute to support future batches.
            </p>

            <p>
              The platform does not host pirated textbooks or unauthorized
              copyrighted academic publications.
            </p>
          </div>
        </section>

        {/* INTEGRITY */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">
            Academic Integrity & Independence
          </h2>

          <div className="text-lg text-gray-700 leading-relaxed space-y-6">
            <p>
              This platform operates independently and is not officially
              affiliated with any university.
            </p>

            <p>
              Intellectual property rights are respected. Any legitimate
              copyright concerns may be communicated for prompt review and
              resolution.
            </p>
          </div>
        </section>

        {/* ACCESS */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">
            Access & Monetization
          </h2>

          <div className="grid md:grid-cols-2 gap-16 text-lg text-gray-700 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Access Model</h3>
              <p>
                Most notes are currently available free of cost. A mixed model
                may be introduced in the future where select premium notes are
                paid while maintaining broad accessibility.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Advertisements</h3>
              <p>
                Advertisements may be displayed to support operational and
                development costs while keeping academic value as the primary
                priority.
              </p>
            </div>
          </div>
        </section>

        {/* FUTURE */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">
            Future Vision
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            The long-term objective is to expand subject coverage, maintain
            academic quality, and potentially introduce a structured student
            contribution system while preserving consistency and reliability.
          </p>
        </section>

      </div>
    </div>
  );
}