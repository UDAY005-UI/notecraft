"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="px-16 py-24 space-y-16">

        <section>
          <h1 className="text-4xl font-semibold mb-6">Privacy Policy</h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl">
            This Privacy Policy describes how this platform collects, uses,
            and protects user information. This platform currently serves
            users within India.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4 max-w-5xl">
            <p>
              We collect only limited personal information necessary for
              account functionality. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Name</li>
              <li>Email address</li>
            </ul>
            <p>
              Authentication is handled securely by Clerk. We do not store
              passwords or manage authentication credentials directly.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4 max-w-5xl">
            <p>Information is used to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Create and manage user accounts</li>
              <li>Enable access to notes after login</li>
              <li>Provide customer support</li>
              <li>Improve platform functionality</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4 max-w-5xl">
            <p>
              Authentication is managed by Clerk. In the future, we may use
              third-party services including:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Payment gateways for paid notes</li>
              <li>Analytics tools</li>
              <li>Advertising services such as Google AdSense</li>
            </ul>
            <p>
              These services may collect information in accordance with their
              own privacy policies.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl">
            This platform may use cookies for authentication and future
            advertising or analytics purposes. Users may manage cookie
            preferences through their browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl">
            Reasonable technical and administrative measures are implemented
            to protect user information. However, no method of transmission
            over the internet is completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Rights</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl">
            Users may request account deletion or data removal by contacting
            us at notecraft.helpdesk@gmail.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl">
            This Privacy Policy may be updated from time to time. Continued
            use of the platform constitutes acceptance of the updated policy.
          </p>
        </section>

      </div>
    </div>
  );
}