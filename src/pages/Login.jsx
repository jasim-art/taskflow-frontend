
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
  AuthContext
} from "../context/AuthContext";

import {
  NotificationContext
} from "../context/NotificationContext";

function Login() {

  const navigate =
    useNavigate();

  const { login } =
    useContext(AuthContext);

  const {
    addNotification
  } = useContext(
    NotificationContext
  );

  const [
    formData,
    setFormData
  ] = useState({

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

        const response =
          await api.post(
            "/auth/login",
            formData
          );

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "name",
          response.data.name
        );

        localStorage.setItem(
          "email",
          response.data.email
        );

        login(
          response.data.token
        );

        addNotification(
          `Welcome back ${response.data.name} 👋`
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Invalid Credentials"
        );

      }

    };

  return (

    <div className="min-h-screen flex">

      {/* Left Section */}

      <div
        className="
          hidden
          lg:flex
          w-1/2
          bg-slate-950
          text-white
          flex-col
          justify-center
          px-12
          xl:px-20
        "
      >

        <h1
          className="
            text-5xl
            xl:text-6xl
            font-bold
            mb-6
          "
        >
          TaskFlow
        </h1>

        <p
          className="
            text-lg
            xl:text-xl
            text-slate-300
          "
        >
          Manage your tasks efficiently
          and stay productive.
        </p>

      </div>

      {/* Right Section */}

      <div
        className="
          flex-1
          flex
          justify-center
          items-center
          bg-slate-100
          px-4
        "
      >

        <div
          className="
            bg-white
            p-6
            md:p-10
            rounded-3xl
            shadow-xl
            w-full
            max-w-md
          "
        >

          <h2
            className="
              text-3xl
              md:text-4xl
              font-bold
              mb-2
            "
          >
            Login
          </h2>

          <p
            className="
              text-gray-500
              mb-8
            "
          >
            Sign in to continue
          </p>

          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-slate-900
              "
            />

            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-slate-900
              "
            />

            <button
              type="submit"
              className="
                w-full
                bg-slate-950
                text-white
                py-3
                rounded-xl
                hover:bg-slate-800
                transition
              "
            >
              Login
            </button>

          </form>

          <p
            className="
              mt-6
              text-center
              text-gray-600
            "
          >

            Don't have an account?

            <Link
              to="/register"
              className="
                text-blue-600
                ml-2
                font-semibold
              "
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;

