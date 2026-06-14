import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <main className="flex-grow max-w-6xl mx-auto w-full p-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Recent Guest Feedback
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Cleanliness Issue"
            description="The room was great, but the bathroom water heater wasn't working properly during the morning."
            badge="Negative"
          />
          <Card
            title="Great Hospitality"
            description="The host cooked us an amazing local meal. Will definitely recommend this to fellow trekkers!"
            badge="Positive"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
