import { Link } from "react-router-dom";
import { Card } from "../components/ui";

const NotFound = () => {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center flex-col">
      <Card>
        <h1 className="text-4xl font-bold my-2 text-center">404</h1>
        <h2 className="text-2xl font-semibold my-2 text-center">
          Página No Encontrada
        </h2>
        <p className="text-center text-blue-600 hover:no-underline hover:scale-110 transition-transform duration-200 ">
          Volver a <Link to="/">Inicio</Link>
        </p>
      </Card>
    </div>
  );
};

export default NotFound;
