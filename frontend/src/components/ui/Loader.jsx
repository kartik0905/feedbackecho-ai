/**
 * Reusable animated spinner loader indicating background processing.
 * @param {Object} props - Component props
 * @param {string} [props.size='w-6 h-6'] - Tailwind width and height utility classes
 */
export default function Loader({ size = "w-6 h-6" }) {
  return (
    <div
      className={`border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400 rounded-full animate-spin ${size}`}
    ></div>
  );
}
