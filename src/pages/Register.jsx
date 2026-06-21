import {
  useState,
  useContext
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import api from "../services/api";

import {
  NotificationContext
} from "../context/NotificationContext";

function Register() {

  const navigate =
    useNavigate();

  const {
    addNotification
  } = useContext(
    NotificationContext
  );

  const [
    formData,
    setFormData
  ] = useState({

    name: "",
    email: "",
    password: ""

  });

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/auth/register",
          formData
        );

        addNotification(
          `Welcome to TaskFlow ${formData.name} 🎉`
        );

        alert(
          "Registration Successful"
        );

        navigate(
          "/login"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Registration Failed"
        );

      }

    };

  return (

    <div className="min-h-screen flex">

      <div className="hidden lg:flex w-1/2 bg-slate-950 text-white flex-col justify-center px-20">

        <h1 className="text-6xl font-bold mb-6">
          TaskFlow
        </h1>

        <p className="text-xl text-slate-300">
          Create an account and start managing your tasks like a pro.
        </p>

      </div>

      <div className="flex-1 bg-slate-100 flex justify-center items-center">

        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">

          <h2 className="text-4xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Register to continue
          </p>

          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              type="submit"
              className="w-full bg-slate-950 text-white py-3 rounded-xl hover:bg-slate-800"
            >
              Register
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-600 ml-2 font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Register;