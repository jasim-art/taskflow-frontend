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

      const email =
        localStorage.getItem("email");

      const response =
        await api.get(
          `/tasks?email=${email}`
        );

      const tasks =
        response.data || [];

      setStats({

        total:
          tasks.length,

        completed:
          tasks.filter(
            task =>
              task.status ===
              "Completed"
          ).length,

        pending:
          tasks.filter(
            task =>
              task.status ===
              "Pending"
          ).length,

        inProgress:
          tasks.filter(
            task =>
              task.status ===
              "In Progress"
          ).length

      });

    } catch (error) {

      console.error(
        "Analytics Error:",
        error
      );

    }

  };

  const completionRate =
    stats.total === 0
      ? 0
      : Math.round(
          (stats.completed /
            stats.total) *
            100
        );

  return (

    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 overflow-auto">

        <Navbar />

        <div className="p-4 md:p-8 space-y-8">

          <h1 className="text-3xl md:text-4xl font-bold">
            Analytics
          </h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
              <h3 className="text-gray-500">
                Total Tasks
              </h3>

              <p className="text-3xl md:text-5xl font-bold mt-3">
                {stats.total}
              </p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
              <h3 className="text-gray-500">
                Completed
              </h3>

              <p className="text-3xl md:text-5xl font-bold text-green-600 mt-3">
                {stats.completed}
              </p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
              <h3 className="text-gray-500">
                Pending
              </h3>

              <p className="text-3xl md:text-5xl font-bold text-yellow-500 mt-3">
                {stats.pending}
              </p>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
              <h3 className="text-gray-500">
                In Progress
              </h3>

              <p className="text-3xl md:text-5xl font-bold text-blue-600 mt-3">
                {stats.inProgress}
              </p>
            </div>

          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl shadow">

            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Completion Rate
            </h2>

            <p className="text-4xl md:text-6xl font-bold text-green-600">
              {completionRate}%
            </p>

            <div className="w-full bg-gray-200 rounded-full h-4 md:h-5 mt-6">

              <div
                className="bg-green-500 h-4 md:h-5 rounded-full transition-all duration-500"
                style={{
                  width: `${completionRate}%`
                }}
              />

            </div>

          </div>

          <TaskChart
            stats={stats}
          />

        </div>

      </div>

    </div>

  );

}

export default Analytics;