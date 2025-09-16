package utn.estudiantes.servicio;

import java.util.List;

import utn.estudiantes.modelo.Alumnos2025;

public interface IEstudianteServicio {
    public List<Alumnos2025> listarEstudiantes();

    public Alumnos2025 buscarEstudiantePorId(Integer idalumnos2025);

    public void guardarEstudiante(Alumnos2025 estudiante);

    public void eliminarEstudiante(Alumnos2025 estudiante);
}
