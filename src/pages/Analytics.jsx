import { useEffect, useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import TaskChart from "../dashboard/TaskChart";

import api from "../services/api";

function Analytics() {

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {

    try {

      const response =
        await api.get(
          "/tasks/stats"
        );

      setStats(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const completionRate =
    stats.total === 0
      ? 0
      : Math.round(
          (stats.completed /
            stats.total) * 100
        );

  return (

    <div className="flex h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 overflow-auto">

        <Navbar />

        <div className="p-8 space-y-8">

          <h1 className="text-4xl font-bold">
            Analytics
          </h1>

          {/* Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-gray-500">
                Total Tasks
              </h3>

              <p className="text-5xl font-bold mt-3">
                {stats.total}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-gray-500">
                Completed
              </h3>

              <p className="text-5xl font-bold text-green-600 mt-3">
                {stats.completed}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-gray-500">
                Pending
              </h3>

              <p className="text-5xl font-bold text-yellow-500 mt-3">
                {stats.pending}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-gray-500">
                In Progress
              </h3>

              <p className="text-5xl font-bold text-blue-600 mt-3">
                {stats.inProgress}
              </p>
            </div>

          </div>

          {/* Completion Rate */}

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-bold mb-4">
              Completion Rate
            </h2>

            <p className="text-6xl font-bold text-green-600">
              {completionRate}%
            </p>

            <div className="w-full bg-gray-200 rounded-full h-5 mt-6">

              <div
                className="bg-green-500 h-5 rounded-full transition-all duration-500"
                style={{
                  width: `${completionRate}%`
                }}
              />

            </div>

          </div>

          {/* Pie Chart */}

          <TaskChart
            stats={stats}
          />

        </div>

      </div>

    </div>

  );
}

export default Analytics;