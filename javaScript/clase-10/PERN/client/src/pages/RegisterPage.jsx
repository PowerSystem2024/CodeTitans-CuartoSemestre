import { useForm } from "react-hook-form";
import { Button, Card, Input, Label, Container } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, error } = useAuth();
  const navigate = useNavigate();
  // Función que se ejecuta al enviar el formulario hace la petición al backend
  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);
    if (user) {
      navigate("/profile");
    }
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {error &&
          error.map((error) => {
            <p className="bg-red-500 text-white p-2 mb-2 rounded">{error}</p>;
          })}

        <h3 className="text-4xl font-bold my-2">Registro</h3>
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label htmlFor="name">Nombre</Label>
          <Input
            placeholder="Ingrese Su Nombre"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            type="email"
            placeholder="Ingrese Su Correo "
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <Label htmlFor="password">Contraseña</Label>
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
        <div className="flex justify-between items-center my-4">
          <p>Ya tienes una cuenta? </p>
          <Link
            to="/login"
            className="text-sm text-blue-500 hover:no-underline"
          >
            Iniciar Sesión
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default RegisterPage;
