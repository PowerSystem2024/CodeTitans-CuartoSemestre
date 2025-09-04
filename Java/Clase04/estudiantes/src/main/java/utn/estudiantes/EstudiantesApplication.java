package utn.estudiantes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import utn.estudiantes.servicio.EstudianteServicio;

@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner {

	// Inyectamos la dependencia del servicio de estudiantes
	@Autowired
	private EstudianteServicio estudianteServicio;
	private static final Logger logger = LoggerFactory.getLogger(EstudiantesApplication.class);

	String nl = System.lineSeparator(); // Nueva línea para formateo de logs

	public static void main(String[] args) {
		logger.info("Aplicación de Estudiantes iniciada correctamente.");

		// Esta linea levanta el servidor de Spring Boot
		SpringApplication.run(EstudiantesApplication.class, args);
		logger.info("Aplicación de Estudiantes finalizada.");

	}

	@Override
	public void run(String... args) throws Exception {
		logger.info(nl + "Ejecutando el metodo run de Spring Boot..." + nl);

	}

}
