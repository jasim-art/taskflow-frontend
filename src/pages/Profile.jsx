import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
  FaList,
  FaSignOutAlt,
  FaEdit,
  FaSave
} from "react-icons/fa";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import api from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [editMode, setEditMode] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const [totalTasks, setTotalTasks] =
    useState(0);

  const [completedTasks, setCompletedTasks] =
    useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const email =
          localStorage.getItem("email");

        if (!email) {
          navigate("/login");
          return;
        }

        // Profile
        const profileResponse =
          await api.get(
            `/auth/profile/${encodeURIComponent(email)}`
          );

        setUser(profileResponse.data);

        setFormData({
          name:
            profileResponse.data.name || "",
          email:
            profileResponse.data.email || "",
          password: ""
        });

        // Tasks
        const tasksResponse =
          await api.get(
            `/tasks?email=${encodeURIComponent(email)}`
          );

        const tasks =
          tasksResponse.data || [];

        console.log(
          "Tasks:",
          tasks
        );

        setTotalTasks(
          tasks.length
        );

        setCompletedTasks(
          tasks.filter(
            task =>
              task.status &&
              task.status.toUpperCase() ===
                "COMPLETED"
          ).length
        );
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [navigate]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSave =
    async () => {
      try {
        await api.put(
          `/auth/profile/${encodeURIComponent(
            user.email
          )}`,
          formData
        );

        setUser({
          ...user,
          name: formData.name,
          email: formData.email
        });

        localStorage.setItem(
          "email",
          formData.email
        );

        localStorage.setItem(
          "name",
          formData.name
        );

        alert(
          "Profile Updated Successfully"
        );

        setEditMode(false);
      } catch (error) {
        console.error(error);

        alert(
          "Failed to Update Profile"
        );
      }
    };

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-5xl font-bold mb-8">
            My Profile
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left Card */}

            <div className="bg-white rounded-3xl shadow p-10 flex flex-col items-center">
              <div className="w-40 h-40 rounded-full bg-slate-950 text-white flex items-center justify-center text-6xl font-bold mb-6">
                {user.name
                  ?.substring(0, 2)
                  .toUpperCase()}
              </div>

              <h2 className="text-4xl font-bold">
                {user.name}
              </h2>

              <p className="text-gray-500 mt-2">
                TaskFlow User
              </p>
            </div>

            {/* Right Card */}

            <div className="lg:col-span-2 bg-white rounded-3xl shadow p-8">
              <h2 className="text-3xl font-bold mb-8">
                Account Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Name */}

                <div className="bg-slate-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaUser />
                    <span>
                      Full Name
                    </span>
                  </div>

                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      value={
                        formData.name
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full mt-4 border rounded-lg px-3 py-2"
                    />
                  ) : (
                    <h3 className="text-2xl font-bold mt-4">
                      {user.name}
                    </h3>
                  )}
                </div>

                {/* Email */}

                <div className="bg-slate-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaEnvelope />
                    <span>
                      Email
                    </span>
                  </div>

                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full mt-4 border rounded-lg px-3 py-2"
                    />
                  ) : (
                    <h3 className="text-2xl font-bold mt-4">
                      {user.email}
                    </h3>
                  )}
                </div>

                {/* Total Tasks */}

                <div className="bg-slate-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaList />
                    <span>
                      Total Tasks
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mt-4">
                    {totalTasks}
                  </h3>
                </div>

                {/* Completed Tasks */}

                <div className="bg-slate-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaCheckCircle />
                    <span>
                      Completed Tasks
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mt-4 text-green-600">
                    {completedTasks}
                  </h3>
                </div>

                {/* Joined */}

                <div className="bg-slate-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaCalendarAlt />
                    <span>
                      Joined
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mt-4">
                    2026
                  </h3>
                </div>

                {/* Status */}

                <div className="bg-slate-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaUser />
                    <span>
                      Status
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mt-4 text-green-600">
                    Active
                  </h3>
                </div>
              </div>

              <div className="flex gap-4 mt-8">

                {editMode ? (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <FaSave />
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setEditMode(
                        true
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit Profile
                  </button>
                )}

                <button
                  onClick={
                    handleLogout
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;