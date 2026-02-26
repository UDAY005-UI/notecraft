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
        <div className="min-h-screen w-full flex items-center justify-center bg-black text-white px-6">
            <div className="max-w-3xl text-center space-y-8">

                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                    Study with clarity. Perform with confidence.
                </h1>

                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    Access structured notes, revise efficiently, and focus only on
                    what matters during exams. No distractions. Just organized,
                    reliable learning material built for students.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-5 pt-6">

                    <button
                        onClick={handleGetStarted}
                        className="px-8 py-3 rounded-lg bg-white text-black font-semibold transition-all duration-200 hover:bg-gray-200"
                    >
                        Get Started
                    </button>

                    <button
                        onClick={handleBrowseComponents}
                        className="px-8 py-3 rounded-lg border border-white text-white font-semibold transition-all duration-200 hover:bg-white hover:text-black"
                    >
                        Browse Notes
                    </button>

                </div>
            </div>
        </div>
    );
}