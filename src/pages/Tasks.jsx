import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import TaskTable from "../components/tasks/TaskTable";

function Tasks() {

  return (

    <div className="flex h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <TaskTable />

        </div>

      </div>

    </div>

  );
}

export default Tasks;