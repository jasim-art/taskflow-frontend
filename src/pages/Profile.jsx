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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [editMode, setEditMode] =
    useState(false);

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

        const profileResponse =
          await api.get(
            `/auth/profile/${encodeURIComponent(email)}`
          );

        setUser(profileResponse.data);

        setFormData({
          name: profileResponse.data.name,
          email: profileResponse.data.email,
          password: ""
        });

        const tasksResponse =
          await api.get(
            `/tasks?email=${encodeURIComponent(email)}`
          );

        const tasks =
          tasksResponse.data || [];

        setTotalTasks(tasks.length);

        setCompletedTasks(
          tasks.filter(task => {
            const status =
              task.status?.toLowerCase();

            return (
              status === "completed" ||
              status === "done"
            );
          }).length
        );

      } catch (error) {

        console.error(error);

      }

    };

    loadData();

  }, [navigate]);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSave = async () => {

    try {

      const response =
        await api.put(
          `/auth/profile/${encodeURIComponent(
            user.email
          )}`,
          formData
        );

      setUser(response.data);

      localStorage.setItem(
        "name",
        response.data.name
      );

      localStorage.setItem(
        "email",
        response.data.email
      );

      alert(
        "Profile Updated Successfully"
      );

      setEditMode(false);

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Update Profile"
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
              mb-8
            "
          >
            My Profile
          </h1>

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-6
            "
          >

            {/* Profile Card */}

            <div
              className="
                bg-white
                rounded-3xl
                shadow
                p-6
                md:p-10
                flex
                flex-col
                items-center
              "
            >

              <div
                className="
                  w-28
                  h-28
                  md:w-40
                  md:h-40
                  rounded-full
                  bg-slate-950
                  text-white
                  flex
                  items-center
                  justify-center
                  text-4xl
                  md:text-6xl
                  font-bold
                  mb-6
                "
              >

                {user.name
                  ?.substring(0, 2)
                  .toUpperCase()}

              </div>

              <h2
                className="
                  text-2xl
                  md:text-4xl
                  font-bold
                  text-center
                "
              >
                {user.name}
              </h2>

              <p
                className="
                  text-gray-500
                  mt-2
                  text-center
                "
              >
                TaskFlow User
              </p>

            </div>

            {/* Info Card */}

            <div
              className="
                lg:col-span-2
                bg-white
                rounded-3xl
                shadow
                p-4
                md:p-8
              "
            >

              <h2
                className="
                  text-2xl
                  md:text-3xl
                  font-bold
                  mb-8
                "
              >
                Account Information
              </h2>

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-6
                "
              >

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
                      value={formData.name}
                      onChange={handleChange}
                      className="
                        w-full
                        mt-4
                        border
                        rounded-xl
                        px-4
                        py-2
                      "
                    />

                  ) : (

                    <h3
                      className="
                        text-xl
                        md:text-2xl
                        font-bold
                        mt-4
                      "
                    >
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
                      value={formData.email}
                      onChange={handleChange}
                      className="
                        w-full
                        mt-4
                        border
                        rounded-xl
                        px-4
                        py-2
                      "
                    />

                  ) : (

                    <h3
                      className="
                        text-lg
                        md:text-2xl
                        font-bold
                        mt-4
                        break-all
                      "
                    >
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

                  <h3
                    className="
                      text-xl
                      md:text-2xl
                      font-bold
                      mt-4
                    "
                  >
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

                  <h3
                    className="
                      text-xl
                      md:text-2xl
                      font-bold
                      mt-4
                      text-green-600
                    "
                  >
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

                  <h3
                    className="
                      text-xl
                      md:text-2xl
                      font-bold
                      mt-4
                    "
                  >
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

                  <h3
                    className="
                      text-xl
                      md:text-2xl
                      font-bold
                      mt-4
                      text-green-600
                    "
                  >
                    Active
                  </h3>

                </div>

              </div>

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-4
                  mt-8
                "
              >

                {editMode ? (

                  <button
                    onClick={handleSave}
                    className="
                      bg-green-500
                      hover:bg-green-600
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      gap-2
                      w-full
                      sm:w-auto
                    "
                  >

                    <FaSave />

                    Save Changes

                  </button>

                ) : (

                  <button
                    onClick={() =>
                      setEditMode(true)
                    }
                    className="
                      bg-blue-500
                      hover:bg-blue-600
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      gap-2
                      w-full
                      sm:w-auto
                    "
                  >

                    <FaEdit />

                    Edit Profile

                  </button>

                )}

                <button
                  onClick={handleLogout}
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    sm:w-auto
                  "
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