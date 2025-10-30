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
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookie.get("token");

      if (!token) {
        setUser(null);
        setIsAuth(false);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/profile");
        setUser(res.data.user);
        setIsAuth(true);
      } catch (error) {
        setUser(null);
        setIsAuth(false);
        Cookie.remove("token");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  //UseEfect para limpiar los errores despues de 4 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setErrors(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error]);

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
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
