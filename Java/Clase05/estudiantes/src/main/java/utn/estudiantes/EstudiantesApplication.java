package utn.estudiantes;

import java.util.List;
import java.util.Scanner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import utn.estudiantes.modelo.Alumnos2025;
import utn.estudiantes.servicio.EstudianteServicio;

@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner {

	// Inyectamos la dependencia del servicio de estudiantes
	@Autowired
	private EstudianteServicio estudianteServicio;
	private static final Logger logger = LoggerFactory.getLogger(EstudiantesApplication.class);

	String nl = System.lineSeparator(); // Nueva línea para formateo de logs

	public static void main(String[] args) {

		logger.info("Aplicacion de Estudiantes iniciada correctamente.");

		// Esta linea levanta el servidor de Spring Boot
		SpringApplication.run(EstudiantesApplication.class, args);
		logger.info("Aplicacion de Estudiantes finalizada.");

	}

	@Override
	public void run(String... args) throws Exception {
		logger.info(nl + "Ejecutando el metodo run de Spring Boot..." + nl);
		var salir = false;
		var consola = new Scanner(System.in);
		while (!salir) {
			mostrarMenu();
			salir = ejecutarOpciones(consola);
			logger.info(nl + "============================" + nl);
		}
	}

	private void mostrarMenu() {

		logger.info("""
				===== Menu de Estudiantes 2025 =====
				1. Listar estudiantes
				2. Buscar estudiante
				3. Agregar nuevo estudiante
				4. Modificar estudiante
				5. Eliminar estudiante por ID
				6. Salir
				Ingrese una opcion:""");

	}

	private boolean ejecutarOpciones(Scanner consola) {
		var opcion = Integer.parseInt(consola.nextLine());
		var salir = false;
		switch (opcion) {
			case 1 -> {
				logger.info(nl + "Listado de estudiantes:");
				List<Alumnos2025> estudiantes = estudianteServicio.listarEstudiantes();
				estudiantes.forEach(estudiante -> logger.info(estudiante.toString() + nl));
			}
			case 2 -> {
				logger.info("Ingrese el ID del estudiante a buscar:");
				var idBuscar = Integer.parseInt(consola.nextLine());
				var estudiante = estudianteServicio.buscarEstudiantePorId(idBuscar);
				if (estudiante != null) {
					logger.info(nl + "Estudiante encontrado:" + nl + estudiante + nl);
				} else {
					logger.warn(nl + "No se encontro ningun estudiante con ID: " + idBuscar + nl);
				}
			}
			case 3 -> {
				logger.info("Ingrese el nombre del nuevo estudiante:");
				var nombre = consola.nextLine();
				logger.info("Ingrese el apellido del nuevo estudiante:");
				var apellido = consola.nextLine();
				logger.info("Ingrese el numero de telefono:");
				var telefono = consola.nextLine();
				logger.info("Ingrese el email:");
				var email = consola.nextLine();
				// Creanmos el objeto estudiante sin el id porque es autogenerado
				var nuevoEstudiante = new Alumnos2025();
				nuevoEstudiante.setNombre(nombre);
				nuevoEstudiante.setApellido(apellido);
				nuevoEstudiante.setTelefono(telefono);
				nuevoEstudiante.setEmail(email);
				estudianteServicio.guardarEstudiante(nuevoEstudiante);
				logger.info(nl + "Nuevo estudiante agregado con exito:" + nl + nuevoEstudiante + nl);

			}
			case 4 -> {
				logger.info("Ingrese el ID del estudiante a modificar:");
				var idModificar = Integer.parseInt(consola.nextLine());
				// Buscamos el estudiante por ID
				Alumnos2025 estudianteModificar = estudianteServicio.buscarEstudiantePorId(idModificar);
				if (estudianteModificar != null) {
					logger.info("Nombre: ");
					var nombre = consola.nextLine();
					logger.info("Apellido: ");
					var apellido = consola.nextLine();
					logger.info("Telefono: ");
					var telefono = consola.nextLine();
					logger.info("Email: ");
					var email = consola.nextLine();
					// Actualizamos los datos del estudiante
					estudianteModificar.setNombre(nombre);
					estudianteModificar.setApellido(apellido);
					estudianteModificar.setTelefono(telefono);
					estudianteModificar.setEmail(email);
					// Guardamos los cambios
					estudianteServicio.guardarEstudiante(estudianteModificar);
					logger.info(nl + "Estudiante modificado con exito:" + nl + estudianteModificar + nl);
				} else {
					logger.warn(nl + "No se encontro ningun estudiante con ID: " + idModificar + nl);
				}

			}
			case 5 -> {
				logger.info("Ingrese el ID del estudiante a eliminar:");
				var idEliminar = Integer.parseInt(consola.nextLine());
				// Buscamos el estudiante por ID
				Alumnos2025 estudianteEliminar = estudianteServicio.buscarEstudiantePorId(idEliminar);
				if (estudianteEliminar != null) {
					estudianteServicio.eliminarEstudiante(estudianteEliminar);
					logger.info(nl + "Estudiante eliminado con exito:" + nl + estudianteEliminar + nl);
				} else {
					logger.warn(nl + "No se encontro ningun estudiante con ID: " + idEliminar + nl);
				}
			}
			case 6 -> {
				logger.info(nl + "Saliendo de la aplicacion. Hasta luego!" + nl);
				salir = true;
			}
			default -> logger.warn(nl + "Opcion invalida. Por favor, intente de nuevo." + nl);

		}// Fin switch

		return salir;
	}

}