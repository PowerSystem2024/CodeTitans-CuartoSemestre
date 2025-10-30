import { useEffect } from "react";
import { CardTasks } from "../components/tasks/CardTasks";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";

export const TasksPage = () => {
  const { tasks, getTasks } = useTasks();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      getTasks();
    }
  }, [isAuth, getTasks]);

  if (tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <h1 className="text-3xl font-bold">No hay tareas </h1>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <CardTasks key={task.id} task={task} />
      ))}
    </div>
  );
};
