"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AuthGuard } from "../components/AuthWrapper";
import { useAuth, useUser } from "@clerk/nextjs";

interface Note {
  id: string;
  title: string;
  description: string;
  university: string;
  degree: string;
  stream: string;
  year: string;
  semester: string;
  subject: string;
  price: number;
  fileUrl: string;
  createdAt: string;
}

export default function ViewNotes() {
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser();

  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [stream, setStream] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  /* ------------------ USER SYNC ------------------ */

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const syncUser = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/create`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("User sync error:", err);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, getToken]);

  /* ------------------ FETCH NOTES ------------------ */

  const fetchNotes = async (filters?: Record<string, string>) => {
    try {
      setLoading(true);

      const token = await getToken();
      if (!token) return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/get-notes`,
        {
          params: filters || {},
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setNotes(response.data.data);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ INITIAL LOAD ------------------ */

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetchNotes();
  }, [isLoaded, isSignedIn]);

  /* ------------------ APPLY FILTERS ------------------ */

  const handleApplyFilters = () => {
    const params: Record<string, string> = {};

    if (university) params.university = university;
    if (degree) params.degree = degree;
    if (stream) params.stream = stream;
    if (year) params.year = year;
    if (semester) params.semester = semester;
    if (subject) params.subject = subject;

    fetchNotes(params);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold text-black mb-8">
            Browse Notes
          </h1>

          {/* FILTER SECTION */}
          <div className="bg-gray-100 p-8 rounded-2xl shadow-sm border border-gray-200 mb-10">
            <h2 className="text-lg font-semibold text-black border-b pb-2 mb-6">
              Filter Notes
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <Select value={university} onChange={setUniversity} options={["MAKAUT"]} placeholder="Select University" />
              <Select value={degree} onChange={setDegree} options={["B.Tech"]} placeholder="Select Degree" />
              <Select value={stream} onChange={setStream} options={["CSE"]} placeholder="Select Stream" />
              <Select value={year} onChange={setYear} options={["1", "2", "3", "4"]} placeholder="Select Year" />
              <Select value={semester} onChange={setSemester} options={["1", "2", "3", "4", "5", "6", "7", "8"]} placeholder="Select Semester" />

              <Select
                value={subject}
                onChange={setSubject}
                options={[
                  "MATHEMATICS-IA",
                  "PHYSICS-I",
                  "BASIC ELECTRICAL ENGINEERING",
                  "CHEMISTRY-I",
                  "MATHEMATICS-IIA",
                  "PROGRAMMING FOR PROBLEM SOLVING",
                  "ENGLISH",
                  "ANALOG & DIGITAL ELECTRONICS",
                  "DATA STRUCTURES & ALGORITHMS",
                  "COMPUTER ORGANISATION",
                  "MATHEMATICS-IIIA",
                  "ECONOMICS FOR ENGINEERS",
                  "DISCRETE MATHEMATICS",
                  "COMPUTER ARCHITECTURE",
                  "FORMAL LANGUAGE & AUTOMATA THEORY",
                  "DESIGN & ANALYSIS OF ALGORITHMS",
                  "BIOLOGY",
                  "ENVIRONMENTAL SCIENCES",
                  "SOFTWARE ENGINEERING",
                  "COMPILER DESIGN",
                  "OPERATING SYSTEMS",
                  "OBJECT ORIENTED PROGRAMMING",
                  "INTRODUCTION TO INDUSTRIAL MANAGEMENT",
                  "ARTIFICIAL INTELLIGENCE",
                  "CONSTITUTION OF INDIA",
                  "DATABASE MANAGEMENT SYSTEMS",
                  "COMPUTER NETWORKS",
                  "DISTRIBUTED SYSTEMS",
                  "IMAGE PROCESSING",
                  "PATTERN RECOGNITION",
                  "NUMERICAL METHODS",
                  "RESEARCH METHODOLOGY",
                  "DATA WAREHOUSING & DATA MINING",
                  "HUMAN RESOURCE DEVELOPMENT & ORGANIZATIONAL BEHAVIOR",
                  "MACHINE LEARNING",
                  "SOFT COMPUTING",
                  "ADHOC-SENSOR NETWORK",
                  "OPERATION RESEARCH",
                  "MULTIMEDIA TECHNOLOGY",
                  "PROJECT MANAGEMENT & ENTREPENEURSHIP",
                  "CRYPTOGRAPHY & NETWORK SECURITY",
                  "INTERNET OF THINGS",
                  "BIG DATA ANALYSIS",
                  "MOBILE COMPUTING",
                  "E-COMMERCE & ERP"
                ]}
                placeholder="Select Subject"
              />
            </div>

            <div className="mt-6">
              <button
                onClick={handleApplyFilters}
                className="bg-black text-white px-6 py-2.5 rounded-xl hover:opacity-90 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* RESULTS */}
          {loading ? (
            <div className="text-black">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="bg-gray-100 p-8 rounded-2xl shadow-sm border border-gray-200 text-black">
              <h3 className="text-lg font-semibold mb-2">No Notes Found</h3>
              <p className="text-gray-600 text-sm">
                Try adjusting filters or browse another subject.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {note.title}
                    </h3>

                    <div className="text-sm text-gray-600 mb-3 space-y-1">
                      <p><span className="font-medium">University:</span> {note.university}</p>
                      <p><span className="font-medium">Degree:</span> {note.degree} | {note.stream}</p>
                      <p><span className="font-medium">Year:</span> {note.year} | Semester {note.semester}</p>
                      <p><span className="font-medium">Subject:</span> {note.subject}</p>
                    </div>

                    <h3 className="text-sm font-semibold text-black">
                      Description
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                      {note.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-semibold text-black">
                      {note.price === 0 ? "Free" : `₹${note.price}`}
                    </p>

                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
                    >
                      View PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

/* ------------------ SELECT COMPONENT ------------------ */

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 text-black rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}