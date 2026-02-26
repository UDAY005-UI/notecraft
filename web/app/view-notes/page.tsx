"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AuthGuard } from "../components/AuthWrapper";
import { useAuth, useUser } from "@clerk/nextjs";

interface Note {
  id: string;
  title: string;
  price: number;
  fileUrl: string;
  createdAt: string;
}

export default function Home() {
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
          "http://localhost:5500/users/create",
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

  /* ------------------ FETCH NOTES FUNCTION ------------------ */

  const fetchNotes = async (filters?: Record<string, string>) => {
    try {
      setLoading(true);

      const token = await getToken();
      if (!token) return;

      const response = await axios.get(
        "http://localhost:5500/notes/get-notes",
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

  /* ------------------ FETCH ALL NOTES ON LOAD ------------------ */

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetchNotes(); // no filters → fetch all
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
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <h1 className="text-3xl font-semibold text-black mb-8">
            Browse Notes
          </h1>

          {/* FILTER CARD */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
            <h2 className="text-lg font-semibold text-black border-b pb-2 mb-6">
              Filter Notes
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <Select
                value={university}
                onChange={setUniversity}
                options={["MAKAUT"]}
                placeholder="Select University"
              />

              <Select
                value={degree}
                onChange={setDegree}
                options={["B.Tech"]}
                placeholder="Select Degree"
              />

              <Select
                value={stream}
                onChange={setStream}
                options={["CSE"]}
                placeholder="Select Stream"
              />

              <Select
                value={year}
                onChange={setYear}
                options={["1", "2", "3", "4"]}
                placeholder="Select Year"
              />

              <Select
                value={semester}
                onChange={setSemester}
                options={["1", "2", "3", "4", "5", "6", "7", "8"]}
                placeholder="Select Semester"
              />

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
            <div className="bg-white p-8 rounded-2xl shadow text-black">
              No notes found.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-black mb-3">
                    {note.title}
                  </h3>

                  <p className="text-black mb-4">
                    {note.price === 0 ? "Free" : `₹${note.price}`}
                  </p>

                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    View PDF
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

/* ------------------ REUSABLE SELECT COMPONENT ------------------ */

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
      className="w-full border border-black text-black rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
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