import { useState } from "react";
import api from "../../services/api";

function EditTaskModal({
  task,
  onClose,
  refreshTasks
}) {

  const [title, setTitle] =
    useState(task.title);

  const [description, setDescription] =
    useState(task.description);

  const [status, setStatus] =
    useState(task.status);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      await api.put(
        `/tasks/${task.id}`,
        {
          title,
          description,
          status
        }
      );

      refreshTasks();
      onClose();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">

      <div className="bg-white p-5 md:p-6 rounded-xl w-full max-w-md shadow-xl">

        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Edit Task
        </h2>

        <form onSubmit={handleUpdate}>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="border p-3 rounded-lg w-full mb-3"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="border p-3 rounded-lg w-full mb-3"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border p-3 rounded-lg w-full mb-4"
          >
            <option>
              Pending
            </option>

            <option>
              In Progress
            </option>

            <option>
              Completed
            </option>
          </select>

          <div className="flex flex-col sm:flex-row gap-3">

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Update
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditTaskModal;