import React, { useEffect } from 'react';
import { useTasks } from "../context/TaskContext";
import TaskItem from "../Components/TaskItem/TaskItem";
import Filters from "../Components/Filters/Filters";
import { filteredTasks } from "../utils/utilities";
import TaskModal from '../Components/TaskItem/TaskModal';

function Home() {
  const { tasks, openModalForAdd, priority, setPriority , isEditing, modalMode} = useTasks();
  const filtered = filteredTasks(tasks, priority);

  console.log("isEditing:", isEditing);
  console.log("modalMode:", modalMode);

  useEffect(() => {
    setPriority("all");
  }, []);

  const handleAddClick = () => {
    console.log("Add button clicked"); // Add debug log
    openModalForAdd();
};

return (
  <>
  <main className="m-6 h-full">
      <div className="flex justify-between">
          <h1 className="text-2xl font-bold">All Tasks</h1>
          <Filters />
      </div>
      <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
          {filtered.map((task, i) => (
              <TaskItem key={i} task={task} />
          ))}
          <button
              className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400 hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
              onClick={handleAddClick}
          >
              Add New Task
          </button>
      </div>

  </main>
  {isEditing && modalMode === "add" && <TaskModal />}

  </>
);
}

export default Home;