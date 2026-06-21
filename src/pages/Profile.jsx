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

  const [editing, setEditing] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: ""
    });

  useEffect(() => {

    const loadProfile = async () => {

      try {

        const email =
          localStorage.getItem(
            "email"
          );

        if (!email) {

          navigate("/login");
          return;
        }

        const response =
          await api.get(
            `/auth/profile/${encodeURIComponent(email)}`
          );

        setUser(response.data);

        setFormData({
          name: response.data.name,
          email: response.data.email
        });

      } catch (error) {

        console.error(
          "Profile Error:",
          error
        );

        navigate("/login");
      }
    };

    loadProfile();

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
          `/auth/profile/${user.email}`,
          formData
        );

      setUser(
        response.data
      );

      localStorage.setItem(
        "email",
        response.data.email
      );

      localStorage.setItem(
        "name",
        response.data.name
      );

      setEditing(false);

      alert(
        "Profile Updated Successfully"
      );

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

      <div
        className="
          flex
          justify-center
          items-center
          h-screen
        "
      >

        <h1
          className="
            text-3xl
            font-bold
          "
        >
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

          <h1
            className="
              text-5xl
              font-bold
              mb-8
            "
          >
            My Profile
          </h1>

          <div
            className="
              grid
              lg:grid-cols-3
              gap-8
            "
          >

            {/* Avatar Card */}

            <div
              className="
                bg-white
                rounded-3xl
                shadow-lg
                p-10
                flex
                flex-col
                items-center
              "
            >

              <div
                className="
                  w-40
                  h-40
                  rounded-full
                  bg-slate-950
                  text-white
                  flex
                  items-center
                  justify-center
                  text-6xl
                  font-bold
                  mb-6
                "
              >

                {formData.name
                  ?.substring(0, 2)
                  .toUpperCase()}

              </div>

              <h2
                className="
                  text-3xl
                  font-bold
                "
              >
                {formData.name}
              </h2>

              <p
                className="
                  text-gray-500
                  mt-2
                "
              >
                TaskFlow User
              </p>

            </div>

            {/* Information Card */}

            <div
              className="
                lg:col-span-2
                bg-white
                rounded-3xl
                shadow-lg
                p-8
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                  mb-8
                "
              >
                Account Information
              </h2>

              <div
                className="
                  grid
                  md:grid-cols-2
                  gap-6
                "
              >

                {/* Name */}

                <div
                  className="
                    bg-slate-100
                    rounded-2xl
                    p-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-gray-600
                    "
                  >
                    <FaUser />
                    <span>
                      Full Name
                    </span>
                  </div>

                  {
                    editing ? (

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="
                          w-full
                          mt-4
                          p-3
                          border
                          rounded-xl
                        "
                      />

                    ) : (

                      <h3
                        className="
                          text-2xl
                          font-bold
                          mt-4
                        "
                      >
                        {user.name}
                      </h3>

                    )
                  }

                </div>

                {/* Email */}

                <div
                  className="
                    bg-slate-100
                    rounded-2xl
                    p-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-gray-600
                    "
                  >
                    <FaEnvelope />
                    <span>
                      Email
                    </span>
                  </div>

                  {
                    editing ? (

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="
                          w-full
                          mt-4
                          p-3
                          border
                          rounded-xl
                        "
                      />

                    ) : (

                      <h3
                        className="
                          text-xl
                          font-bold
                          mt-4
                          break-all
                        "
                      >
                        {user.email}
                      </h3>

                    )
                  }

                </div>

                {/* Tasks */}

                <div
                  className="
                    bg-slate-100
                    rounded-2xl
                    p-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-gray-600
                    "
                  >
                    <FaList />
                    <span>
                      Total Tasks
                    </span>
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mt-4
                    "
                  >
                    --
                  </h3>

                </div>

                {/* Completed */}

                <div
                  className="
                    bg-slate-100
                    rounded-2xl
                    p-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-gray-600
                    "
                  >
                    <FaCheckCircle />
                    <span>
                      Completed Tasks
                    </span>
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-green-600
                      mt-4
                    "
                  >
                    --
                  </h3>

                </div>

                {/* Joined */}

                <div
                  className="
                    bg-slate-100
                    rounded-2xl
                    p-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-gray-600
                    "
                  >
                    <FaCalendarAlt />
                    <span>
                      Joined
                    </span>
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mt-4
                    "
                  >
                    2026
                  </h3>

                </div>

                {/* Status */}

                <div
                  className="
                    bg-slate-100
                    rounded-2xl
                    p-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      text-gray-600
                    "
                  >
                    <FaUser />
                    <span>
                      Status
                    </span>
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-green-600
                      mt-4
                    "
                  >
                    Active
                  </h3>

                </div>

              </div>

              <div
                className="
                  flex
                  gap-4
                  mt-8
                "
              >

                {
                  editing ? (

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
                        gap-2
                      "
                    >

                      <FaSave />

                      Save Changes

                    </button>

                  ) : (

                    <button
                      onClick={() =>
                        setEditing(true)
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
                        gap-2
                      "
                    >

                      <FaEdit />

                      Edit Profile

                    </button>

                  )
                }

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
                    gap-2
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