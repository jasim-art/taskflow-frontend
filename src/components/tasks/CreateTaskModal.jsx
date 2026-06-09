import { useState } from "react";
import api from "../../services/api";

function CreateTaskModal({
  refreshTasks,
  onClose
}) {

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: ""
  });

  const handleChange = (e) => {

    setTask({
      ...task,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const email =
        localStorage.getItem(
          "email"
        );

      await api.post(
        `/tasks?email=${email}`,
        task
      );

      refreshTasks();

      onClose();

    } catch (error) {

      console.error(
        error
      );

      alert(
        "Failed to create task"
      );

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-4xl font-bold">
            Create Task
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-5 py-4"
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={task.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full border rounded-xl px-5 py-4"
          />

          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full border rounded-xl px-5 py-4"
          >

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

          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full border rounded-xl px-5 py-4"
          >

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>

          </select>

          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-5 py-4"
          />

          <div className="flex justify-end gap-4 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Create Task
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default CreateTaskModal;