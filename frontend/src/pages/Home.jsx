import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import { Loader } from "../components/ui";
import Footer from "../components/Footer";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/reviews");
        const result = await response.json();
        if (result.success) {
          setReviews(result.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <Hero />
      <main className="flex-grow max-w-6xl mx-auto w-full p-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Recent Guest Feedback
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader size="w-12 h-12" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <Card
                key={review._id}
                title={review.title}
                description={review.description}
                badge={review.badge}
              />
            ))}
            {reviews.length === 0 && (
              <p className="text-gray-500">
                No reviews found. Add some via the API!
              </p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
