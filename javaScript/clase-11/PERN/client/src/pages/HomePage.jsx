import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Card } from "../components/ui/Card";

const HomePage = () => {
  const data = useContext(AuthContext);
  console.log(data);

  return (
    <Card className="font-bold justify-center text-2xl py-4">
      <h1>Proyecto de Gestión de Tareas - UTN 2025</h1>
      <p>
        Bienvenido al proyecto de gestión de tareas desarrollado como parte del
        curso de Desarrollo de Aplicaciones Web en la Universidad Tecnológica
        Nacional (UTN). Esta aplicación permite a los usuarios crear, editar y
        gestionar sus tareas de manera eficiente.
      </p>
    </Card>
  );
};

export default HomePage;
