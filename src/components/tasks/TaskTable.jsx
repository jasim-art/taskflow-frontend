import {
  useEffect,
  useState,
  useContext
} from "react";

import api from "../../services/api";

import CreateTaskModal from "./CreateTaskModal";
import EditTaskModal from "./EditTaskModal";

import {
  NotificationContext
} from "../../context/NotificationContext";

function TaskTable() {

  const [tasks, setTasks] =
    useState([]);

  const [showCreateModal,
    setShowCreateModal] =
    useState(false);

  const [selectedTask,
    setSelectedTask] =
    useState(null);

  const [search,
    setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("All");

  const {
    addNotification
  } = useContext(
    NotificationContext
  );

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks =
    async () => {

      try {

        const email =
          localStorage.getItem(
            "email"
          );

        const response =
          await api.get(
            `/tasks?email=${email}`
          );

        setTasks(
          response.data
        );

        response.data.forEach(
          task => {

            if (
              !task.dueDate
            ) return;

            const today =
              new Date();

            const dueDate =
              new Date(
                task.dueDate
              );

            const diffTime =
              dueDate - today;

            const diffDays =
              Math.ceil(
                diffTime /
                (1000 * 60 * 60 * 24)
              );

            if (
              diffDays >= 0 &&
              diffDays <= 3
            ) {

              addNotification(
                `⚠️ Task "${task.title}" is due in ${diffDays} day(s)`
              );

            }

            if (
              diffDays < 0
            ) {

              addNotification(
                `🚨 Task "${task.title}" is overdue`
              );

            }

          }
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };

  const deleteTask =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this task?"
        );

      if (!confirmDelete)
        return;

      try {

        await api.delete(
          `/tasks/${id}`
        );

        loadTasks();

      } catch (error) {

        console.error(
          error
        );

      }

    };

  const filteredTasks =
    tasks.filter(
      task => {

        const matchesSearch =
          task.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesStatus =
          statusFilter === "All"
            ? true
            : task.status ===
              statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );

      }
    );

  const getStatusColor =
    status => {

      switch (status) {

        case "Completed":
          return "bg-green-100 text-green-700";

        case "Pending":
          return "bg-yellow-100 text-yellow-700";

        case "In Progress":
          return "bg-blue-100 text-blue-700";

        default:
          return "bg-gray-100 text-gray-700";

      }

    };

  const getPriorityColor =
    priority => {

      switch (priority) {

        case "High":
          return "bg-red-100 text-red-700";

        case "Medium":
          return "bg-yellow-100 text-yellow-700";

        case "Low":
          return "bg-green-100 text-green-700";

        default:
          return "bg-gray-100 text-gray-700";

      }

    };

  return (

    <>

      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

          <div className="flex flex-col sm:flex-row gap-3">

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="border px-4 py-2 rounded-lg w-full sm:w-auto"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="border px-4 py-2 rounded-lg"
            >

              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

          <button
            onClick={() =>
              setShowCreateModal(
                true
              )
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow w-full md:w-auto"
          >
            + Create Task
          </button>

        </div>

        {/* Desktop Table */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Title
                </th>

                <th className="text-left py-4">
                  Description
                </th>

                <th className="text-left py-4">
                  Status
                </th>

                <th className="text-left py-4">
                  Priority
                </th>

                <th className="text-left py-4">
                  Due Date
                </th>

                <th className="text-left py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTasks.map(
                task => (

                  <tr
                    key={task.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="py-4">
                      {task.title}
                    </td>

                    <td className="py-4">
                      {task.description}
                    </td>

                    <td className="py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}
                      >
                        {task.status}
                      </span>

                    </td>

                    <td className="py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>

                    </td>

                    <td className="py-4">
                      {task.dueDate}
                    </td>

                    <td className="py-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            setSelectedTask(
                              task
                            )
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteTask(
                              task.id
                            )
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}

        <div className="md:hidden space-y-4">

          {filteredTasks.length === 0 ? (

            <div className="text-center py-10 text-gray-500">
              No tasks found
            </div>

          ) : (

            filteredTasks.map(
              task => (

                <div
                  key={task.id}
                  className="border rounded-xl p-4 bg-slate-50"
                >

                  <h3 className="font-bold text-lg mb-2">
                    {task.title}
                  </h3>

                  <p className="text-gray-600 mb-3">
                    {task.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}
                    >
                      {task.status}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    Due: {task.dueDate}
                  </p>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        setSelectedTask(
                          task
                        )
                      }
                      className="flex-1 bg-green-500 text-white py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteTask(
                          task.id
                        )
                      }
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>

      {showCreateModal && (

        <CreateTaskModal
          refreshTasks={loadTasks}
          onClose={() =>
            setShowCreateModal(
              false
            )
          }
        />

      )}

      {selectedTask && (

        <EditTaskModal
          task={selectedTask}
          refreshTasks={loadTasks}
          onClose={() =>
            setSelectedTask(
              null
            )
          }
        />

      )}

    </>

  );

}

export default TaskTable;