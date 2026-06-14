import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6 max-w-6xl mx-auto w-full mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Login</h1>
        <p className="text-gray-600">
          Please enter your credentials to access the homestay management
          portal.
        </p>
      </main>
      <Footer />
    </div>
  );
}
