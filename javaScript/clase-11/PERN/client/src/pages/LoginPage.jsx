import { Button, Card, Input, Label, Container } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, error: loginError } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);
    if (user) {
      navigate("/tasks");
    }
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {loginError &&
          loginError.map((error) => {
            <p className="bg-red-500 text-white p-2 mb-2 rounded">{error}</p>;
          })}

        <h1 className="text-4xl font-bold my-2 text-center">Iniciar Sesión</h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-2 w-80">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            type="email"
            placeholder="Ingrese su correo"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">Este campo es requerido</span>
          )}

          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            placeholder="Ingrese su contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500">Este campo es requerido</span>
          )}

          <Button type="submit" className="mt-4 text-center">
            Ingresar
          </Button>
        </form>
        <div className="flex justify-between items-center my-4">
          <p className="mr-4">¿No tienes una cuenta? </p>
          <Link
            to="/register"
            className="text-sm text-blue-500 hover:no-underline"
          >
            Regístrarte
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default LoginPage;
