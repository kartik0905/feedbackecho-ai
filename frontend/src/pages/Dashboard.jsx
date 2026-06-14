import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6 max-w-6xl mx-auto w-full mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-600">
          This is a placeholder for the main application dashboard where review
          metrics and sentiment analysis will be displayed.
        </p>
      </main>
      <Footer />
    </div>
  );
}
