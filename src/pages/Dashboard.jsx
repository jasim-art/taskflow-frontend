
import {
  useEffect,
  useState
} from "react";

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaSpinner
} from "react-icons/fa";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import api from "../services/api";

function Dashboard() {

  const [tasks, setTasks] =
    useState([]);

  const [stats, setStats] =
    useState({

      total: 0,
      completed: 0,
      pending: 0,
      inProgress: 0

    });

  const [userName, setUserName] =
    useState("");

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      try {

        const email =
          localStorage.getItem(
            "email"
          );

        const name =
          localStorage.getItem(
            "name"
          );

        setUserName(name);

        const response =
          await api.get(
            `/tasks?email=${email}`
          );

        const userTasks =
          response.data;

        setTasks(userTasks);

        setStats({

          total:
            userTasks.length,

          completed:
            userTasks.filter(
              task =>
                task.status ===
                "Completed"
            ).length,

          pending:
            userTasks.filter(
              task =>
                task.status ===
                "Pending"
            ).length,

          inProgress:
            userTasks.filter(
              task =>
                task.status ===
                "In Progress"
            ).length

        });

      } catch (error) {

        console.error(error);

      }

    };

  const upcomingTasks =
    tasks.filter(task => {

      if (!task.dueDate)
        return false;

      const today =
        new Date();

      const dueDate =
        new Date(
          task.dueDate
        );

      const diffDays =
        Math.ceil(
          (dueDate - today) /
          (1000 * 60 * 60 * 24)
        );

      return (
        diffDays >= 0 &&
        diffDays <= 7
      );

    });

  return (

    <div className="flex min-h-screen bg-slate-100 overflow-x-hidden">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-4 md:p-8">

          <h1
            className="
              text-3xl
              md:text-5xl
              font-bold
              mb-2
            "
          >
            Dashboard
          </h1>

          <p className="text-gray-500 mb-8">
            Welcome back,
            {" "}
            {userName}
            👋
          </p>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-6
              mb-8
            "
          >

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Total Tasks
                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold mt-2">
                    {stats.total}
                  </h2>

                </div>

                <FaTasks className="text-4xl text-blue-600" />

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Completed
                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold mt-2 text-green-600">
                    {stats.completed}
                  </h2>

                </div>

                <FaCheckCircle className="text-4xl text-green-600" />

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Pending
                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold mt-2 text-yellow-500">
                    {stats.pending}
                  </h2>

                </div>

                <FaClock className="text-4xl text-yellow-500" />

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    In Progress
                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold mt-2 text-blue-600">
                    {stats.inProgress}
                  </h2>

                </div>

                <FaSpinner className="text-4xl text-blue-600" />

              </div>

            </div>

          </div>

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-6
            "
          >

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-xl md:text-2xl font-bold mb-4">
                User Profile
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-4">

                <div
                  className="
                    w-16
                    h-16
                    rounded-full
                    bg-slate-950
                    text-white
                    flex
                    items-center
                    justify-center
                    text-2xl
                  "
                >

                  {userName
                    ?.substring(0, 2)
                    .toUpperCase()}

                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    {userName}
                  </h3>

                  <p className="text-gray-500">
                    TaskFlow User
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Upcoming Deadlines
              </h2>

              {upcomingTasks.length === 0 ? (

                <p className="text-gray-500">
                  No upcoming tasks
                </p>

              ) : (

                upcomingTasks.map(
                  task => (

                    <div
                      key={task.id}
                      className="border-b py-3"
                    >

                      <p className="font-semibold">
                        {task.title}
                      </p>

                      <p className="text-sm text-red-500">
                        Due:
                        {" "}
                        {task.dueDate}
                      </p>

                    </div>

                  )
                )

              )}

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Recent Tasks
              </h2>

              {tasks
                .slice(-5)
                .reverse()
                .map(task => (

                  <div
                    key={task.id}
                    className="border-b py-3"
                  >

                    <p className="font-semibold">
                      {task.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      {task.status}
                    </p>

                  </div>

                ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;

