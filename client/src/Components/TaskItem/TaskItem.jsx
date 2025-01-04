import { useTasks } from "../../context/TaskContext";
import { edit, star, trash } from "../../utils/Icons";
import { formatTime } from "../../utils/utilities";
import React from "react";
import TaskModal from "./TaskModal";

function TaskItem({ task }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const { getTask, openModalForEdit, deleteTask, isEditing, closeModal } = useTasks();

  const handleEditClick = () => {
    console.log("Edit button clicked for task:", task._id);
    getTask(task._id)
      .then(() => {
        console.log("Task data fetched successfully");
        openModalForEdit(task); // Open the modal
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });
  };

  return (
    <>
      <div className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white">
        <div>
          <h4 className="font-bold text-2xl">{task.title}</h4>
          <p>{task.description}</p>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-sm text-gray-400">{formatTime(task.createdAt)}</p>
          <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </p>
          <div>
            <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
              <button
                className={`${
                  task.completed ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                {star}
              </button>
              <button
                className="text-[#00A1F1]"
                onClick={handleEditClick} // Use the new handler
              >
                {edit}
              </button>
              <button
                className="text-[#F65314]"
                onClick={() => {
                  deleteTask(task._id);
                }}
              >
                {trash}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render the TaskModal if isEditing is true */}
      {isEditing && <TaskModal />}
    </>
  );
}

export default TaskItem;