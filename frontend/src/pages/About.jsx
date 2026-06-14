import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6 max-w-6xl mx-auto w-full mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600">
          FeedbackEcho AI is designed to help rural homestays in Uttarakhand
          protect their digital reputation through intelligent review
          classification.
        </p>
      </main>
      <Footer />
    </div>
  );
}
