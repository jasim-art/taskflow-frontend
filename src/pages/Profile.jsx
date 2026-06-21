import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import api from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const email = localStorage.getItem("email");

        if (!email) {
          navigate("/login");
          return;
        }

        console.log("Loading profile for:", email);

        const response = await api.get(
          `/auth/profile/${encodeURIComponent(email)}`
        );

        console.log("Profile Response:", response.data);

        setUser(response.data);
      } catch (error) {
        console.error("Profile Error:", error);
      }
    };

    loadProfile();
  }, [navigate]);

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
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">
              My Profile
            </h1>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-500">
                  Name
                </p>

                <p className="text-xl">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-500">
                  Email
                </p>

                <p className="text-xl">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-8 bg-red-500 text-white px-6 py-3 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;