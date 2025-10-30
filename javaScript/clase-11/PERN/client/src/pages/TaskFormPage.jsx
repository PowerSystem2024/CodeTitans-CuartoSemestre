import { Card, Input, TextArea, Label, Button } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTasks } from "../context/TasksContext.jsx";

const TaskFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const { createTask, getTask, updateTask, error: tasksError } = useTasks();
  const onSubmit = handleSubmit(async (data) => {
    let task;
    if (!params.id) {
      task = await createTask(data);
      navigate("/tasks");
    } else {
      task = await updateTask(params.id, data);
      navigate("/tasks");
      console.log(task);
    }
  });

  useEffect(() => {
    if (params.id) {
      // Lógica para obtener la tarea por ID y llenar el formulario para edición
      getTask(params.id).then((task) => {
        setValue("title", task.title);
        setValue("description", task.description);
      });
    }
  }, [getTask, params.id, setValue]);

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {tasksError &&
          tasksError.map((error) => (
            <p key={error} className="bg-red-500 text-white p-2 mb-2">
              {error}
            </p>
          ))}

        <h1 className="text-3xl font-bold my-4">
          {params.id ? "Editar Tarea" : "Crear Tarea"}
        </h1>
        <form onSubmit={onSubmit}>
          <Label htmlFor="titulo">Titulo</Label>
          <Input
            type="text"
            placeholder="Titulo"
            autoFocus
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500">El titulo es requerido</span>
          )}

          <Label htmlFor="descripcion">Descripción</Label>
          <TextArea
            placeholder="Descripción"
            rows={3}
            {...register("description")}
          />

          <Button type="submit">Guardar</Button>
        </form>
      </Card>
    </div>
  );
};

export default TaskFormPage;
