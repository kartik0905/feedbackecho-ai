import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input, Modal, Toast, Loader } from "../components/ui";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateAiProcessing = () => {
    setIsModalOpen(false);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <Navbar />

      <main className="flex-grow p-6 max-w-6xl mx-auto w-full mt-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Review Management Library</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Testing ground for the FeedbackEcho AI responsive design system
            elements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 transition-colors duration-200">
          {/* Section A: Controls */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2 dark:border-gray-700">
              Form Inputs & Action States
            </h2>
            <Input
              label="Simulate Homestay Review Input"
              placeholder="Paste a mock checkout review here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex gap-4">
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Analyze Text
              </Button>
              <Button variant="secondary" onClick={() => setInputValue("")}>
                Clear
              </Button>
            </div>
          </div>

          {/* Section B: Async Tracking Status */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2 dark:border-gray-700">
              Async Pipeline Monitor
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-750 border rounded-md dark:border-gray-700 flex items-center justify-between">
              <div>
                <p className="font-medium">Groq Inference Engine Status</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isProcessing
                    ? "Classifying payload sentiment..."
                    : "Idle - Awaiting payload input execution"}
                </p>
              </div>
              {isProcessing && <Loader size="w-8 h-8" />}
            </div>
          </div>
        </div>

        {/* Modal Structure Display */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirm Processing Pipeline"
        >
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Are you sure you want to forward this payload data to
            high-throughput inference nodes?
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Abort
            </Button>
            <Button variant="primary" onClick={simulateAiProcessing}>
              Confirm Pipeline Dispatch
            </Button>
          </div>
        </Modal>

        {/* Toast Alerts Trigger */}
        <Toast
          message="Inference payload mapped to JSON structure successfully!"
          isVisible={showToast}
        />
      </main>

      <Footer />
    </div>
  );
}
