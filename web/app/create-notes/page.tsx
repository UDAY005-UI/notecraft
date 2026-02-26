"use client";

import { useState, FormEvent } from "react";
import { AuthGuard } from "../components/AuthWrapper";
import { useAuth } from "@clerk/nextjs";

interface UploadResponse {
  message: string;
  note: {
    id: string;
    title: string;
    fileUrl: string;
  };
}

export default function CreateNotePage() {
  const { getToken } = useAuth();

  // Note fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Academic fields
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [stream, setStream] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResponse | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("university", university);
    formData.append("degree", degree);
    formData.append("stream", stream);
    formData.append("year", year);
    formData.append("semester", semester);
    formData.append("subject", subject);
    formData.append("file", file);

    try {
      const token = await getToken();
      if (!token) throw new Error("Authentication failed.");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Upload failed");

      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-semibold text-black mb-8">
            Create New Note
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <SectionTitle title="Note Information" />

            <Input label="Title" value={title} onChange={setTitle} required />
            <Input label="Description" value={description} onChange={setDescription} />
            <Input
              label="Price"
              type="number"
              value={price}
              onChange={setPrice}
              required
            />

            <SectionTitle title="Academic Information" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                options={["1","2","3","4","5","6","7","8"]}
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

            <SectionTitle title="Upload PDF" />

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                PDF File
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                className="w-full border border-black rounded-lg p-2 text-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Create Note"}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
              <p className="font-medium">{result.message}</p>
              <a
                href={result.note.fileUrl}
                target="_blank"
                className="underline mt-2 block"
              >
                View Uploaded PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

/* ---------------- Reusable Components ---------------- */

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-semibold text-black border-b pb-2">
      {title}
    </h2>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-black mb-1">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-black rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

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