import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input, Toast } from "../components/ui";

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const fetchReviews = async () => {
    const res = await fetch("http://localhost:3000/api/reviews");
    const data = await res.json();
    setReviews(data.data || []);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  // CREATE
  const handleCreate = async () => {
    await fetch("http://localhost:3000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, badge: "Neutral" }),
    });
    setTitle("");
    setDescription("");
    fetchReviews();
    showToast("Review Created Successfully!");
  };

  // UPDATE
  const handleUpdate = async (id) => {
    await fetch(`http://localhost:3000/api/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ badge: "Positive" }), // Hardcoded update for demo
    });
    fetchReviews();
    showToast("Review Updated to Positive!");
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/reviews/${id}`, {
      method: "DELETE",
    });
    fetchReviews();
    showToast("Review Deleted!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <main className="flex-grow p-6 max-w-6xl mx-auto w-full mt-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          CRUD Operations Dashboard
        </h1>

        {/* CREATE SECTION */}
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

        {/* READ, UPDATE, DELETE SECTION */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Manage Database Records
          </h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="flex justify-between items-center p-4 border dark:border-gray-700 rounded-md"
              >
                <div>
                  <h3 className="font-bold dark:text-white">
                    {review.title}{" "}
                    <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded ml-2">
                      {review.badge}
                    </span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
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
              <p className="text-gray-500">
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
