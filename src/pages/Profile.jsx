import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
  FaList,
  FaSignOutAlt
} from "react-icons/fa";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import api from "../services/api";

function Profile() {

  const navigate =
    useNavigate();

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const loadProfile =
      async () => {

        try {

          const email =
            localStorage.getItem(
              "email"
            );

          const response =
            await api.get(
              `/auth/profile?email=${email}`
            );

          setUser(
            response.data
          );

        } catch (error) {

          console.error(
            error
          );

        }

      };

    loadProfile();

  }, []);

  const handleLogout =
    () => {

      localStorage.clear();

      navigate(
        "/login"
      );

    };

  if (!user) {

    return (

      <div className="flex justify-center items-center h-screen">

        <h1 className="text-2xl font-bold">
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

            <div
              className="
                bg-white
                rounded-3xl
                shadow
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
                  mb-6
                "
              >

                {user.name
                  ?.substring(0, 2)
                  .toUpperCase()}

              </div>

              <h2
                className="
                  text-4xl
                  font-bold
                "
              >
                {user.name}
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

            <div
              className="
                lg:col-span-2
                bg-white
                rounded-3xl
                shadow
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

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mt-4
                    "
                  >
                    {user.name}
                  </h3>

                </div>

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

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mt-4
                    "
                  >
                    {user.email}
                  </h3>

                </div>

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
                      mt-4
                      text-green-600
                    "
                  >
                    --
                  </h3>

                </div>

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
                      mt-4
                      text-green-600
                    "
                  >
                    Active
                  </h3>

                </div>

              </div>

              <button
                onClick={
                  handleLogout
                }
                className="
                  mt-8
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

  );
}

export default Profile;