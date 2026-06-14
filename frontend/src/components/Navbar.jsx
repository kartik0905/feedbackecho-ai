import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center flex-col md:flex-row gap-4 md:gap-0">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          FeedbackEcho AI
        </Link>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
