export default function Card({ title, description, badge }) {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${badge === "Positive" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {badge}
        </span>
      </div>
      <p className="text-gray-600 text-sm flex-grow">{description}</p>
    </div>
  );
}
