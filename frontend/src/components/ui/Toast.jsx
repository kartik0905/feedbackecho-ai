/**
 * Automated temporary popup notification banner.
 * @param {Object} props - Component props
 * @param {string} props.message - Banner text notice to display
 * @param {boolean} props.isVisible - State element determining visible layout rendering
 */
export default function Toast({ message, isVisible, variant = "success" }) {
  if (!isVisible) return null;

  return (
    <div role="status" className={`fixed bottom-4 right-4 text-white px-6 py-3 rounded-md shadow-lg font-medium z-50 animate-slideUp ${variant === "error" ? "bg-red-600" : "bg-green-600"}`}>
      {message}
    </div>
  );
}
