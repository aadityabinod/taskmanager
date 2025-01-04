import axios from "axios";
import React, {createContext, useEffect, useState} from "react";
import { useUserContext } from "./UserContext";
import toast from "react-hot-toast";

const TasksContext = createContext();

const serverUrl = "http://localhost:8000/api/v1";

export const TasksProvider = ({children}) =>{
    const userId = useUserContext().user._id;

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState({});

    const [isEditing, setIsEditing] = useState(false);
    const [priority, setPriority] = useState("all");
    const [activeTask, setActiveTask] = useState(null);
    const [modalMode, setModalMode] = useState("");
    const [profileModal, setProfileModal] = useState(false);

    const openModalForAdd = () => {
        setModalMode("add");
        setIsEditing(true);
        setTask({});
      };
    
      const openModalForEdit = (task) => {
        setModalMode("edit");
        setIsEditing(true);
        setTask(task); 
        setActiveTask(task);
      };

      const openProfileModal = () => {
        console.log("Opening profile modal");
        setProfileModal(true);
      };
    
      const closeModal = () => {
        setIsEditing(false);
        setProfileModal(false);
        setModalMode("");
        setActiveTask(null);
        setTask({});
      };


    const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/tasks`);

      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Error getting tasks", error.response);
    }
    setLoading(false);
  };

  const getTask = async (taskId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/task/${taskId}`);
      console.log("Fetched task data:", response.data); // Log the fetched task
      setTask(response.data);
    } catch (error) {
      console.log("Error getting task", error);
    }
    setLoading(false);
  };

  const createTask = async (task) => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/task/create`, task);

      console.log("Task created", res.data);

      setTasks([...tasks, res.data]);
      toast.success("Task created successfully");
    } catch (error) {
      console.log("Error creating task", error);
    }
    setLoading(false);
  };

  const updateTask = async (task) => {
    setLoading(true);
    try {
      console.log("Updating task with ID:", task._id);
      console.log("Task data being sent:", task);
  
      const res = await axios.patch(`${serverUrl}/task/${task._id}`, task);
  
      console.log("Task updated successfully", res.data);
  
      const newTasks = tasks.map((tsk) => {
        return tsk._id === res.data._id ? res.data : tsk;
      });
  
      toast.success("Task updated successfully");
  
      setTasks(newTasks);
    } catch (error) {
      console.error("Error updating task", error);
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/task/${taskId}`);

      // remove the task from the tasks array
      const newTasks = tasks.filter((tsk) => tsk._id !== taskId);

      setTasks(newTasks);
    } catch (error) {
      console.log("Error deleting task", error);
    }
  };

  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask((prevTask) => ({
        ...prevTask,
        [name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      }));
    }
  };

  // get completed tasks
  const completedTasks = tasks.filter((task) => task.completed);

  // get pending tasks
  const activeTasks = tasks.filter((task) => !task.completed);

  useEffect(() => {
    getTasks();
  }, [userId]);

  console.log("Active tasks", activeTasks);

  return (
    <TasksContext.Provider
    value={{
      tasks,
      loading,
      task,
      getTask,
      createTask,
      updateTask,
      deleteTask,
      priority,
      setPriority,
      handleInput,     
      isEditing,
      setIsEditing,
      openModalForAdd,
      openModalForEdit,
      closeModal,
      openProfileModal,
      activeTask,
      modalMode,
      activeTasks,
      completedTasks,
      profileModal,  
    }}
    >
              {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return React.useContext(TasksContext);
};
