/**
 * Reusable overlay modal backdrop container.
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Boolean visibility flag determining if modal renders
 * @param {function} props.onClose - Dismiss function triggered by clicking close or backdrop
 * @param {string} props.title - Modal heading text
 * @param {React.ReactNode} props.children - Interior layout contents
 */
export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden border dark:border-gray-700 transition-colors duration-200">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="p-4 text-gray-700 dark:text-gray-300">{children}</div>
      </div>
    </div>
  );
}
