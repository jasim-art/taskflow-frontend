import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div
      className="
        hidden
        md:flex
        w-64
        bg-slate-950
        text-white
        flex-col
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
          className="px-6 py-4 hover:bg-slate-800"
        >
          Dashboard
        </Link>

        <Link
          to="/tasks"
          className="px-6 py-4 hover:bg-slate-800"
        >
          Tasks
        </Link>

        <Link
          to="/analytics"
          className="px-6 py-4 hover:bg-slate-800"
        >
          Analytics
        </Link>

        <Link
          to="/profile"
          className="px-6 py-4 hover:bg-slate-800"
        >
          Profile
        </Link>

      </div>

    </div>

  );

}

export default Sidebar;