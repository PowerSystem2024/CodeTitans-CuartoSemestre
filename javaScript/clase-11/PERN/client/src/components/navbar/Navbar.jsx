import { Link, useLocation } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./navigation";
import { Container } from "../ui";
import { useAuth } from "../../context/AuthContext";
import { twMerge } from "tailwind-merge";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const location = useLocation();
  const { isAuth, signout, user } = useAuth();
  return (
    <nav className="bg-zinc-950">
      <Container className="flex sm:justify-between justify-center px-20 py-3">
        <Link to="/">
          <h1 className="text-white font-bold text-2xl">PERN App</h1>
        </Link>
        <ul className="flex gap-x-3 items-center justify-center">
          {isAuth ? (
            <>
              {PrivateRoutes.map(({ name, path, icon }) => (
                <li key={name}>
                  <Link
                    to={path}
                    className={twMerge(
                      "text-slate-300  items-center flex px-2 py-1",
                      location.pathname === path && "bg-sky-500"
                    )}
                  >
                    {icon}
                    <span className="hidden sm:block">{name}</span>
                  </Link>
                </li>
              ))}
              <li
                onClick={() => signout()}
                className="text-slate-200 cursor-pointer items-center flex px-3 hover:cursor-pointer rounded-md hover:bg-red-600"
              >
                <span className="hidden sm:block">Cerrar Sesión</span>
                <BiLogOut className="inline ml-1 mb-1" />
              </li>
              <li className="text-slate-300 items-center flex px-3 py-1 rounded-md">
                <img
                  src={user?.gravatar}
                  alt="user avatar"
                  className="w-8 h-8 rounded-full ml-2"
                />
                <span className="font-medium">{user?.name}</span>
              </li>
            </>
          ) : (
            PublicRoutes.map(({ name, path, icon }) => (
              <li key={name}>
                <Link
                  to={path}
                  className={twMerge(
                    "text-slate-300  items-center flex px-3 py-1",
                    location.pathname === path && "bg-sky-500"
                  )}
                >
                  {icon} {name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
