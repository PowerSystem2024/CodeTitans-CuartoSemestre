import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { TasksPage } from "./pages/TasksPage.jsx";
import TaskFormPage from "./pages/TaskFormPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import { Container } from "./components/ui/Container.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { TasksProvider } from "./context/TasksContext.jsx";

// const App = () => {
//   const { isAuth, loading } = useAuth();
//   if (loading) {
//     return <h1>Cargando...</h1>;
//   }

//   return (
//     <>
//       <Navbar />
//       <Container className="py-5">
//         <Routes>
//           {/* Rutas públicas accesibles solo si no está autenticado "!isAuth"
//            Si el usuario está autenticado, será redirigido a la página de tareas
//             Usamos la propiedad redirectTo para definir la ruta de redirección*/}
//           <Route
//             element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/tasks" />}
//           >
//             <Route path="/" element={<HomePage />} />
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//           </Route>

//           {/* Rutas protegidas accesibles solo si está autenticado "isAuth"
//            Si el usuario no está autenticado, será redirigido a la página de inicio de sesión
//            Usamos la propiedad redirectTo para definir la ruta de redirección */}
//           <Route
//             element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}
//           >
//             <Route path="/profile" element={<ProfilePage />} />

//             {/*Rutas de tareas protegidas dentro del TasksProvider
//             Proporciona el contexto de tareas a todos los componentes hijos
//             solo se accede a estas rutas si el usuario está autenticado*/}

//             <Route
//               element={
//                 <TasksProvider>
//                   <Outlet />
//                 </TasksProvider>
//               }
//             >
//               <Route path="/tasks" element={<TasksPage />} />
//               <Route path="/tasks/new" element={<TaskFormPage />} />
//               <Route path="/tasks/edit/:id" element={<TaskFormPage />} />
//             </Route>
//           </Route>

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Container>
//     </>
//   );
// };

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/new" element={<TaskFormPage />} />
          <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
