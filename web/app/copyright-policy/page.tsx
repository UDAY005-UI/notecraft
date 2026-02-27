"use client";

export default function CopyrightPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="px-16 py-24 space-y-16">

        <section>
          <h1 className="text-4xl font-semibold mb-6">
            Copyright & Content Policy
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl">
            We respect intellectual property rights and are committed to
            addressing valid copyright concerns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Nature of Content
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl">
            All notes hosted on this platform are handwritten or independently
            prepared academic materials voluntarily contributed by students
            or teachers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Reporting Copyright Concerns
          </h2>

          <div className="text-lg text-gray-700 leading-relaxed space-y-4 max-w-5xl">
            <p>
              If you believe any content infringes upon your copyright,
              please send an email including:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>Your full name and contact information</li>
              <li>Identification of the content in question</li>
              <li>Proof of ownership or authority</li>
              <li>A clear explanation of the concern</li>
            </ul>

            <p className="mt-6 font-medium">
              Email:{" "}
              <a
                href="mailto:notecraft.helpdesk@gmail.com"
                className="underline hover:opacity-70 transition"
              >
                notecraft.helpdesk@gmail.com
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Review & Action
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl">
            Upon receiving a valid complaint, we will review the request and
            take appropriate action, which may include removal of the content.
          </p>
        </section>

      </div>
    </div>
  );
}