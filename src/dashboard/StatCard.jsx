function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3 text-slate-800">
        {value}
      </h2>

    </div>
  );
}

export default StatCard;