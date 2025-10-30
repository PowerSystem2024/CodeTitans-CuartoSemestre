/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import {
  getTasksRequest,
  deleteTasksRequest,
  createTasksRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../config/tasks.api";

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState([]);

  // const getTasks = async () => {
  //   const response = await getTasksRequest();
  //   setTasks(response.data);
  // };

  const getTasks = async () => {
    try {
      const response = await getTasksRequest();
      setTasks(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  const getTask = async (id, task) => {
    try {
      const res = await getTaskRequest(id, task);
      return res.data;
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTasksRequest(task);
      setTasks([...tasks, res.data]);
      return res;
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  const deleteTask = async (id) => {
    const response = await deleteTasksRequest(id);
    if (response.status === 204) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);
      return res.data;
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        getTasks,
        deleteTask,
        createTask,
        error,
        getTask,
        updateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
