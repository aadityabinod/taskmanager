import React from 'react';
import { X } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import toast from 'react-hot-toast';

const TaskModal = () => {
  const { task, handleInput, isEditing, closeModal, createTask, modalMode, updateTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalMode === 'add') {
        await createTask(task); // Create a new task
        toast.success('Task created successfully!');
      } else {
        await updateTask(task); // Update an existing task
        toast.success('Task updated successfully!');
      }
      closeModal(); // Close the modal after successful operation
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save task. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {modalMode === 'add' ? 'Add New Task' : 'Edit Task'}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title || ''}
              onChange={handleInput('title')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={task.description || ''}
              onChange={handleInput('description')}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Priority Field */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={task.priority || 'low'}
              onChange={handleInput('priority')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Due Date Field */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={task.dueDate || ''}
              onChange={handleInput('dueDate')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Completed Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={task.completed || false}
              onChange={(e) => handleInput('completed')({ target: { value: e.target.checked } })}
              className="w-4 h-4 text-blue-600 border border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="completed" className="ml-2 text-sm font-medium text-gray-700">
              Completed
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {modalMode === 'add' ? 'Add Task' : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;