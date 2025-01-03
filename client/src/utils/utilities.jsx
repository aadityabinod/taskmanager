import { Task } from "./types";

export const formatTime = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const formatDate = (date) => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (isSameDay(created, now)) {
    return "Today";
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(created, yesterday)) {
    return "Yesterday";
  }

  const sixDaysAgo = new Date(now);
  sixDaysAgo.setDate(now.getDate() - 6);
  if (created > sixDaysAgo) {
    const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  }

  const threeWeeksAgo = new Date(now);
  threeWeeksAgo.setDate(now.getDate() - 21);
  if (created > threeWeeksAgo) {
    const diffWeeks = Math.floor((now - created) / (1000 * 60 * 60 * 24 * 7));
    return `${diffWeeks} weeks ago`;
  }

  return formatDate(created);
};

export const filteredTasks = (tasks, priority) => {
  const filteredTasks = () => {
    switch (priority) {
      case "low":
        return tasks.filter((task) => task.priority === "low");
      case "medium":
        return tasks.filter((task) => task.priority === "medium");
      case "high":
        return tasks.filter((task) => task.priority === "high");
      default:
        return tasks;
    }
  };

  return filteredTasks();
};

export const overdueTasks = (tasks) => {
  const todayDate = new Date();

  return tasks.filter((task) => {
    return !task.completed && new Date(task.dueDate) < todayDate;
  });
};