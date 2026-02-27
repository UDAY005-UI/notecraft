"use client";

export default function ContactPage() {
  return (
    <div className="w-[90%] md:w-[70%] mx-auto px-6 min-h-screen bg-white text-black">

      {/* HEADER */}
      <div className="w-full border-b border-gray-300">
        <div className="px-16 py-20">
          <h1 className="text-5xl font-semibold mb-6">
            Contact
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl">
            For academic inquiries, copyright concerns, technical issues,
            or general feedback, please use the contact information below.
          </p>
        </div>
      </div>

      {/* CONTACT DETAILS */}
      <div className="w-full">

        <div className="px-16 py-20 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-8">
            General Inquiries
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl">
            For questions regarding notes, subject coverage, or platform usage:
          </p>

          <p className="mt-4 text-lg font-medium">
            <a
              href="mailto:notecraft.helpdesk@gmail.com"
              className="underline hover:opacity-70 transition"
            >
              notecraft.helpdesk@gmail.com
            </a>
          </p>
        </div>

        <div className="px-16 py-20 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-8">
            Copyright & Content Concerns
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl">
            If you believe any content infringes intellectual property rights,
            please include the following in your email:
          </p>

          <ul className="mt-6 space-y-3 text-lg text-gray-700 list-disc list-inside max-w-5xl">
            <li>Your full name and contact information</li>
            <li>Identification of the content in question</li>
            <li>Proof of ownership or authority</li>
            <li>A brief explanation of the concern</li>
          </ul>

          <p className="mt-6 text-lg font-medium">
            <a
              href="mailto:notecraft.helpdesk@gmail.com"
              className="underline hover:opacity-70 transition"
            >
              notecraft.helpdesk@gmail.com
            </a>
          </p>
        </div>

        <div className="px-16 py-20">
          <h2 className="text-2xl font-semibold mb-8">
            Response Time
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl">
            We aim to respond to all legitimate inquiries within 7 business days.
          </p>
        </div>

      </div>
    </div>
  );
}