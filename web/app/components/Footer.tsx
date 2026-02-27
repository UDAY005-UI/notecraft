"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-[-60] bg-black">
        <div className="w-full text-white mt-16">
      <div className="px-16 py-10 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold mb-3">NoteCraft</h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
            Structured academic notes organized by university,
            semester, and subject.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-base font-medium mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-base font-medium mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/copyright-policy" className="hover:underline">
                Copyright
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/20 px-16 py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} NoteCraft. All rights reserved.
      </div>
      </div>
    </footer>
  );
}