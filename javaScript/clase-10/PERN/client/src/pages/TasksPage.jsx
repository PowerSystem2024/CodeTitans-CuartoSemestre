import { useEffect, useState } from "react";
import { getTasksRequest } from "../config/tasks.api";
import { CardTasks } from "../components/tasks/CardTasks";

export const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasksRequest().then((response) => {
      setTasks(response.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2">
      {tasks.map((task) => (
        <CardTasks key={task.id} task={task} />
      ))}
    </div>
  );
};
