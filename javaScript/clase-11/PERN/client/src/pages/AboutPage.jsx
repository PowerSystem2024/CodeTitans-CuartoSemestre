const AboutPage = () => {
  return (
    <div>
      <h1 className="text-center font-bold py-4 px-3 text-4xl">
        Tecnologias Utilizadas
      </h1>
      <h2 className="py-4 px-2 text-2xl">
        Proyecto de Gestión de Tareas - UTN 2025
      </h2>
      <h3 className="py-4 px-2">
        Bienvenido al proyecto de gestión de tareas desarrollado como parte del
        curso de Desarrollo de Aplicaciones Web en la Universidad Tecnológica
        Nacional (UTN). Esta aplicación permite a los usuarios crear, editar y
        gestionar sus tareas de manera eficiente.
      </h3>
      <h2 className="py-4 px-2 text-2xl">Configuracion del proyecto</h2>
      <h3 className="py-4 px-2">
        Antes de comenzar, debemos configurar nuestro proyecto. Asegúrate de
        tener PostgreSQL instalado y configurado con una base de datos. Luego,
        sigue estos pasos: Configura el Servidor Express.js: Crea un servidor
        Express para manejar las solicitudes de la API. Implementa las rutas
        para la autenticación de usuarios y las operaciones CRUD de tareas.
        Configura la Base de Datos: Conecta tu servidor a la base de datos
        PostgreSQL. Crea tablas para usuarios y tareas. Define los modelos
        correspondientes en tu servidor. Desarrolla el Frontend React: Construye
        la interfaz de usuario utilizando React. Crea componentes para mostrar
        la lista de tareas, el formulario de inicio de sesión y el formulario de
        registro. Implementa la Autenticación de Usuarios: Utiliza JWT para
        manejar la autenticación de usuarios. Los usuarios pueden registrarse,
        iniciar sesión y cerrar sesión de manera segura. Operaciones CRUD de
        Tareas: Crea las rutas y controladores para realizar operaciones CRUD en
        las tareas. Esto incluye crear una nueva tarea, leer la lista de tareas,
        actualizar una tarea y eliminar una tarea.
      </h3>
      <h2 className="py-4 px-2 text-2xl">Frontend</h2>
      <h3 className="py-4 px-2">
        Este proyecto utiliza React, Tailwind CSS y Vite como herramientas
        principales para el desarrollo del frontend. React es una biblioteca de
        JavaScript para construir interfaces de usuario, Tailwind CSS es un
        framework de CSS que facilita el diseño responsivo y Vite es una
        herramienta de construcción rápida para proyectos web modernos.
      </h3>
      <h2 className="py-4 px-2 text-2xl">Backend</h2>
      <h3 className="py-4 px-2">
        Este proyecto utiliza Node.js, Express y MongoDB como herramientas
        principales para el desarrollo del backend. Node.js es un entorno de
        ejecución para JavaScript en el servidor, Express es un framework para
        construir aplicaciones web y APIs en Node.js, y MongoDB es una base de
        datos NoSQL que permite almacenar datos de manera flexible y escalable.
      </h3>
    </div>
  );
};

export default AboutPage;
