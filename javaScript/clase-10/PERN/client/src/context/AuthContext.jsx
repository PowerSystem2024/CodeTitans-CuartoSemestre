/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import api from "../config/api";
import Cookie from "js-cookie";

export const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [error, setErrors] = useState(null);

  const signin = async (data) => {
    try {
      const res = await api.post("/login", data);
      setUser(res.data.user);
      setIsAuth(true);
      return res.data;
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const signup = async (data) => {
    try {
      const res = await api.post("/register", data);
      setUser(res.data.user);
      setIsAuth(true);
      return res.data;
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const signout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
      setIsAuth(false);
      Cookie.remove("token");
    } catch (error) {
      console.log(error);
    }
  };

  //Para que al recargar la pagina no se pierda la sesion
  useEffect(() => {
    if (Cookie.get("token")) {
      api
        .get("/profile")
        .then((res) => {
          setUser(res.data.user);
          setIsAuth(true);
        })
        .catch((error) => {
          setUser(null);
          setIsAuth(false);
          console.log(error);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        error,
        signup,
        signin,
        setUser,
        setIsAuth,
        setErrors,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
