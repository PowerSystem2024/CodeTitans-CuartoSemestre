import { Navigate, Outlet } from "react-router-dom";

// Componente de ruta protegida que redirige a /login si no está autenticado
export const ProtectedRoute = ({ redirectTo, isAllowed, children }) => {
  // Si isAllowed es true, renderiza los hijos; de lo contrario, redirige a /login
  // Usamos el prop replace para no guardar la ruta anterior en el historial
  if (isAllowed) return <Navigate to={redirectTo} replace />;

  // retorna los hijos si se proporcionan, de lo contrario renderiza el Outlet para las rutas anidadas
  return children ? children : <Outlet />;
};
