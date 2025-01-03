import {useTasks} from "../context/TaskContext";
import useRedirect from "../hooks/UseUserRedirect";
import {Task} from "../utils/types";
import {filteredTasks, overdueTasks} from "../utils/utilities";
import { useEffect } from "react";
import TaskItem from "../Components/TaskItem/TaskItem";

export default function OverDuePages() {
    useRedirect("/login");

    const { tasks, openModalForAdd, priority, setPriority } = useTasks();
  
    const overdue = overdueTasks(tasks);
  
    const filtered = filteredTasks(overdue, priority);
  
    useEffect(() => {
      setPriority("all");
    }, [setPriority]);
  
    return (
      <main className="m-6 h-full">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Overdue Tasks</h1>
          <Filters />
        </div>
  
        <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
          {filtered.map((task, i) => (
            <TaskItem key={i} task={task} />
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