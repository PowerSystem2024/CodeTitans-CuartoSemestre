import { Card, Button } from "../ui";
import { deleteTasksRequest } from "../../config/tasks.api";

export const CardTasks = ({ task }) => {
  return (
    <Card key={task.id} className="py-4 px-7">
      <div>
        <h1 className="text-2xl font-bold">{task.titulo}</h1>
        <p>{task.descripcion}</p>
      </div>

      <div className="flex gap-x-2 justify-end">
        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={async () => {
            if (
              window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")
            ) {
              // Lógica para eliminar la tarea
              await deleteTasksRequest(task.id);
            }
          }}
        >
          Eliminar
        </Button>
        <Button>Editar</Button>
      </div>
    </Card>
  );
};
