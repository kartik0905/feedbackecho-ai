import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input, Toast } from "../components/ui";

export default function Dashboard() {
  // --- STATE MANAGEMENT ---
  // CRUD States
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  // AI Feature States
  const [reviewInput, setReviewInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiResponse, setAiResponse] = useState(null);

  // --- CRUD OPERATIONS ---
  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/reviews", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setReviews(data.data || []);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleCreate = async () => {
    await fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description, badge: "Neutral" }),
    });
    setTitle("");
    setDescription("");
    fetchReviews();
    showToast("Review Created Successfully!");
  };

  const handleUpdate = async (id) => {
    await fetch(`http://localhost:3000/api/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ badge: "Positive" }), // Hardcoded update for demo purposes
    });
    fetchReviews();
    showToast("Review Updated to Positive!");
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/reviews/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchReviews();
    showToast("Review Deleted!");
  };

  // --- AI FEATURE OPERATION ---
  const handleAIAnalysis = async () => {
    setAiLoading(true);
    setAiError("");
    setAiResponse(null);

    try {
      const res = await fetch("http://localhost:3000/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ reviewText: reviewInput }),
      });

      const data = await res.json();
      if (data.success) {
        setAiResponse(data.data);
        showToast("AI Analysis Complete!");
      } else {
        setAiError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setAiError("Failed to connect to the server.");
    } finally {
      setAiLoading(false);
    }
  };

  // --- UI RENDER ---
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <main className="flex-grow p-6 max-w-6xl mx-auto w-full mt-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Management Dashboard
        </h1>

        {/* AI GENERATOR SECTION */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8 border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            AI Sentiment & Response Generator
          </h2>
          <div className="flex flex-col gap-4">
            <textarea
              className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Paste a guest review here to analyze..."
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
            ></textarea>

            <Button
              onClick={handleAIAnalysis}
              disabled={aiLoading || !reviewInput}
              className="w-[150px]"
            >
              {aiLoading ? "Analyzing..." : "Analyze Review"}
            </Button>

            {aiError && <p className="text-red-500 text-sm mt-2">{aiError}</p>}

            {aiResponse && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-600 rounded-md">
                <p className="mb-2 font-bold dark:text-white">
                  Sentiment:{" "}
                  <span
                    className={`text-xs px-2 py-1 ml-2 rounded-full ${aiResponse.sentiment === "Positive" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : aiResponse.sentiment === "Negative" ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}
                  >
                    {aiResponse.sentiment}
                  </span>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Drafted Reply:</strong>{" "}
                  {typeof aiResponse.draftedResponse === "object"
                    ? aiResponse.draftedResponse.text
                    : aiResponse.draftedResponse}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CREATE RECORD SECTION */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8 border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Add New Review
          </h2>
          <div className="flex gap-4 items-end">
            <Input
              label="Title"
              placeholder="e.g. Great Stay"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              label="Description"
              placeholder="e.g. The room was clean..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={handleCreate} className="h-[42px] min-w-[120px]">
              Add Record
            </Button>
          </div>
        </div>

        {/* MANAGE RECORDS SECTION */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Manage Database Records
          </h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="flex justify-between items-center p-4 border dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div>
                  <h3 className="font-bold dark:text-white">
                    {review.title}
                    <span
                      className={`text-xs px-2 py-1 rounded ml-2 ${review.badge === "Positive" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : review.badge === "Negative" ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}
                    >
                      {review.badge}
                    </span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    {review.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleUpdate(review._id)}
                  >
                    Mark Positive
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No records found. Create one above.
              </p>
            )}
          </div>
        </div>

        <Toast message={toastMsg} isVisible={!!toastMsg} />
      </main>
      <Footer />
    </div>
  );
}
