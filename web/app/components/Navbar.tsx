"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const links = [
    { name: "Home", path: "/view-notes" },
    { name: "About us", path: "/about" },
    { name: "Contact us", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50
      w-[90%] md:w-[70%]
      px-6 py-3 flex items-center justify-between
      backdrop-blur-xl bg-white/80 border border-gray-200
      rounded-4xl shadow-lg"
    >
      <Link href="/" className="flex items-center">
        <Image
          src="/icon.png"
          alt="NoteCraft Logo"
          width={40}
          height={40}
          priority
        />
      </Link>

      <div className="flex items-center gap-6">
        {links.map(({ name, path }) => {
          const active = pathname === path;

          return (
            <Link
              key={name}
              href={path}
              className={`transition font-medium ${
                active
                  ? "text-gray-500"
                  : "text-black hover:text-gray-500"
              }`}
            >
              {name}
            </Link>
          );
        })}
      </div>

      <div className="ml-4">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox:
                "hover:ring-2 hover:ring-gray-400 transition",
            },
          }}
        />
      </div>
    </nav>
  );
}