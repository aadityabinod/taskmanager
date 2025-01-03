import {useTasks} from "../context/TaskContext";
import useRedirect from "../hooks/UseUserRedirect";
import {filteredTasks} from "../utils/utilities";
import { useEffect } from "react";
import Filters from "../Components/Filters/Filters"
import TaskItem from "../Components/TaskItem/TaskItem";

export default function PendingPages() {
    useRedirect("/login");

    const { tasks, openModalForAdd, priority, setPriority } = useTasks();
    const pendingTasks = tasks.filter(( Task) => !Task.completed);

    const filtered = filteredTasks(pendingTasks, priority);

    useEffect(() => {
      setPriority("all");
    }, [setPriority]);

    return (
        <main className="m-6 h-full">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Pending Tasks</h1>
            <Filters />
          </div>
    
          <div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        initial="hidden"
        animate="visible"
      >
        {filtered.map((Task, number) => (
          <TaskItem key={number} task={Task} />
        ))}
        <button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
        >
          Add New Task
        </button>
      </div>
    </main>
  );
}