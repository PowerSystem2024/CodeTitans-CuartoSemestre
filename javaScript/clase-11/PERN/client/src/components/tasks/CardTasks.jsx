import { Card, Button } from "../ui";
import { useTasks } from "../../context/TasksContext";
import { useNavigate } from "react-router-dom";
import { FaTrashRestore } from "react-icons/fa";
import { PiPencilSimpleBold } from "react-icons/pi";

export const CardTasks = ({ task }) => {
  const { deleteTask } = useTasks();
  const navigate = useNavigate();

  return (
    <Card key={task.id} className="py-4 px-7 justify-center flex flex-col ">
      <div>
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p className="py-4">{task.description}</p>
      </div>

      <div className="flex gap-x-2 justify-end">
        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={async () => {
            if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
              await deleteTask(task.id);
            }
          }}
        >
          <FaTrashRestore className="inline-block mr-1 text-white" />
          Eliminar
        </Button>
        <Button onClick={() => navigate(`/tasks/${task.id}/edit`)}>
          <PiPencilSimpleBold className="inline-block mr-1 text-white" />
          Editar
        </Button>
      </div>
    </Card>
  );
};
