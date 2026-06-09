import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function TaskChart({
  stats = {
    completed: 0,
    pending: 0,
    inProgress: 0
  }
}) {

  const data = [
    {
      name: "Completed",
      value: stats.completed || 0
    },
    {
      name: "Pending",
      value: stats.pending || 0
    },
    {
      name: "In Progress",
      value: stats.inProgress || 0
    }
  ];

  const COLORS = [
    "#22c55e",
    "#eab308",
    "#3b82f6"
  ];

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Task Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >

            {data.map(
              (entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[index %
                    COLORS.length]
                  }
                />

              )
            )}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );
}

export default TaskChart;