package utn.estudiantes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import utn.estudiantes.modelo.Alumnos2025;

public interface EstudianteRepositorio extends JpaRepository<Alumnos2025, Integer> {

}
