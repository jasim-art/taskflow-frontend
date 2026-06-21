
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import TaskTable from "../components/tasks/TaskTable";

function Tasks() {

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
              mb-6
            "
          >
            Tasks
          </h1>

          <TaskTable />

        </div>

      </div>

    </div>

  );

}

export default Tasks;

