import { MdAdd } from "react-icons/md";
import { BiTask, BiUser } from "react-icons/bi";

export const PrivateRoutes = [
  {
    name: "Perfil",
    path: "/profile",
    icon: <BiUser />,
  },

  {
    name: "Tareas",
    path: "/tasks",
    icon: <BiTask />,
  },
  {
    name: "Agregar",
    path: "/tasks/new",
    icon: <MdAdd />,
  },
];

export const PublicRoutes = [
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Registro",
    path: "/register",
  },
];
