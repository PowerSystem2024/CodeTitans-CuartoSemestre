import { Link, useLocation } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./navigation";
import { Container } from "../ui";
import { useAuth } from "../../hooks/useAuth";
const Navbar = () => {
  const location = useLocation();
  const { isAuth, signout } = useAuth();
  return (
    <nav className="bg-zinc-950">
      <Container className="flex justify-between items-center py-3">
        <Link to="/">
          <h1 className="text-white font-bold text-2xl">PERN App</h1>
        </Link>
        <ul className="flex gap-4 ml-auto p-4">
          {isAuth ? (
            <>
              {PrivateRoutes.map(({ name, path }) => (
                <li
                  className={`text-slate-200 ${
                    location.pathname === path &&
                    "bg-sky-500 px-3 py-1 rounded-md"
                  }`}
                  key={name}
                >
                  <Link to={path}>{name}</Link>
                </li>
              ))}
              <li
                onClick={() => signout()}
                className="text-slate-200 cursor-pointer"
              >
                Cerrar Sesión
              </li>
            </>
          ) : (
            PublicRoutes.map(({ name, path }) => (
              <li
                key={name}
                className={`text-slate-200 ${
                  location.pathname === path &&
                  "bg-sky-500 px-3 py-1 rounded-md"
                }`}
              >
                <Link to={path}>{name}</Link>
              </li>
            ))
          )}
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
