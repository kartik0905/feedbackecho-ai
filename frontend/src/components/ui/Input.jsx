/**
 * Reusable text input field with dark mode compatibility.
 * @param {Object} props - Component props
 * @param {string} props.label - Label text displayed above the input field
 * @param {string} [props.type='text'] - HTML input type (text, password, email, etc.)
 * @param {string} props.placeholder - Placeholder text inside the input
 * @param {string} props.value - Controlled input value state
 * @param {function} props.onChange - Event handler triggered on input text change
 */
export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors duration-200"
      />
    </div>
  );
}
