import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaSpinner
} from "react-icons/fa";

function StatsCards({ stats }) {

  const cards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: <FaTasks size={28} />
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: <FaCheckCircle size={28} />
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock size={28} />
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: <FaSpinner size={28} />
    }
  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {card.value}
              </h2>

            </div>

            <div className="text-blue-600">
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>

  );
}

export default StatsCards;