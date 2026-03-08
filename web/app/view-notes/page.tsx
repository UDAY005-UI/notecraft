"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AuthGuard } from "../components/AuthWrapper";
import { useAuth, useUser } from "@clerk/nextjs";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

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

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  const [purchasedNotes, setPurchasedNotes] = useState<string[]>([]);
  const [purchasedNotesData, setPurchasedNotesData] = useState<Note[]>([]);

  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [stream, setStream] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  const loadRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

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

  const fetchPurchasedNotes = async () => {

    try {

      const token = await getToken();
      if (!token) return;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/my-purchases`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      const purchased = res.data.data || [];

      setPurchasedNotesData(purchased);
      setPurchasedNotes(purchased.map((n: Note) => n.id));

    } catch (err) {

      console.error("Purchase fetch error:", err);

    }

  };

  useEffect(() => {

    if (!isLoaded || !isSignedIn) return;

    fetchNotes();
    fetchPurchasedNotes();

  }, [isLoaded, isSignedIn]);

  const buyNote = async (noteId: string) => {

    try {

      const token = await getToken();
      if (!token) return;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`,
        { noteId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;

      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Payment gateway failed to load");
        return;
      }

      const options = {

        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {

          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/payment/verify`,
            {
              ...response,
              purchaseId: data.purchaseId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          await fetchPurchasedNotes();

          alert("Payment successful!");

        },

      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {

      console.error("Payment error:", error);

    }

  };

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

          {/* PURCHASED NOTES AT TOP */}

          {purchasedNotesData.length > 0 && (
            <div className="mb-12">

              <h2 className="text-2xl font-semibold text-black mb-6">
                Your Purchased Notes
              </h2>

              <div className="grid md:grid-cols-3 gap-8">

                {purchasedNotesData.map((note) => (

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

                      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                        {note.description}
                      </p>

                    </div>

                    <div className="mt-4 flex justify-end">

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

            </div>
          )}

          {/* FILTER SECTION */}

          <div className="bg-gray-100 p-8 rounded-2xl shadow-sm border border-gray-200 mb-10">

            <h2 className="text-lg font-semibold text-black border-b pb-2 mb-6">
              Filter Notes
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <Select value={university} onChange={setUniversity} options={["MAKAUT"]} placeholder="Select University" />
              <Select value={degree} onChange={setDegree} options={["B.Tech"]} placeholder="Select Degree" />
              <Select value={stream} onChange={setStream} options={["CSE"]} placeholder="Select Stream" />
              <Select value={year} onChange={setYear} options={["1","2","3","4"]} placeholder="Select Year" />
              <Select value={semester} onChange={setSemester} options={["1","2","3","4","5","6","7","8"]} placeholder="Select Semester" />
              <Select value={subject} onChange={setSubject} options={["MATHEMATICS-IA","PHYSICS-I","DATA STRUCTURES & ALGORITHMS","DATABASE MANAGEMENT SYSTEMS","OPERATING SYSTEMS","COMPUTER NETWORKS","MACHINE LEARNING"]} placeholder="Select Subject" />
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

          {/* NORMAL NOTES */}

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

              {notes.map((note) => {

                const purchased = purchasedNotes.includes(note.id);

                return (
                  <div
                    key={note.id}
                    className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition flex flex-col justify-between"
                  >

                    <div>

                      <h3 className="text-xl font-semibold text-black mb-2">
                        {note.title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                        {note.description}
                      </p>
                      <div className="text-sm text-gray-600 mb-3 space-y-1">
                        <p><span className="font-medium">Subject:</span> {note.subject}</p>
                        <p><span className="font-medium">University:</span> {note.university}</p>
                        <p><span className="font-medium">Degree:</span> {note.degree} | {note.stream}</p>
                        <p><span className="font-medium">Year:</span> {note.year} | Semester {note.semester}</p>
                      </div>

                    </div>

                    <div className="mt-4 flex justify-end">

                      {note.price === 0 || purchased ? (
                        <a
                          href={note.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
                        >
                          View PDF
                        </a>
                      ) : (
                        <button
                          onClick={() => buyNote(note.id)}
                          className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
                        >
                          Buy ₹{note.price}
                        </button>
                      )}

                    </div>

                  </div>
                );

              })}

            </div>
          )}

        </div>
      </div>
    </AuthGuard>
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