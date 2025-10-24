import { useForm } from "react-hook-form";
import { Button, Card, Input } from "../components/ui";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Card>
        <h3 className="text-2xl font-bold">Registro</h3>
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            placeholder="Ingrese Su Nombre"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <Input
            type="email"
            placeholder="Ingrese Su Correo "
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <Input
            type="password"
            placeholder="Ingrese Su Contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500">Este campo es requerido</span>
          )}

          <Button>Registrarse</Button>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
