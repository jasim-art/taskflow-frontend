
import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <>

      {/* Desktop Sidebar */}

      <div
        className="
          hidden
          md:flex
          w-64
          bg-slate-950
          text-white
          flex-col
          min-h-screen
        "
      >

        <div
          className="
            p-6
            text-3xl
            font-bold
            border-b
            border-slate-800
          "
        >
          TaskFlow
        </div>

        <div className="mt-4 flex flex-col">

          <Link
            to="/dashboard"
            className="
              px-6
              py-4
              hover:bg-slate-800
              transition
            "
          >
            Dashboard
          </Link>

          <Link
            to="/tasks"
            className="
              px-6
              py-4
              hover:bg-slate-800
              transition
            "
          >
            Tasks
          </Link>

          <Link
            to="/analytics"
            className="
              px-6
              py-4
              hover:bg-slate-800
              transition
            "
          >
            Analytics
          </Link>

          <Link
            to="/profile"
            className="
              px-6
              py-4
              hover:bg-slate-800
              transition
            "
          >
            Profile
          </Link>

        </div>

      </div>

      {/* Mobile Bottom Navigation */}

      <div
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          right-0
          bg-slate-950
          text-white
          flex
          justify-around
          items-center
          py-3
          z-50
          shadow-lg
        "
      >

        <Link
          to="/dashboard"
          className="text-sm"
        >
          Dashboard
        </Link>

        <Link
          to="/tasks"
          className="text-sm"
        >
          Tasks
        </Link>

        <Link
          to="/analytics"
          className="text-sm"
        >
          Analytics
        </Link>

        <Link
          to="/profile"
          className="text-sm"
        >
          Profile
        </Link>

      </div>

    </>

  );

}

export default Sidebar;

