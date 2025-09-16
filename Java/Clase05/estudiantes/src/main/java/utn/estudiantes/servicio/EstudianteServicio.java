package utn.estudiantes.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.estudiantes.modelo.Alumnos2025;
import utn.estudiantes.repositorio.EstudianteRepositorio;

@Service // Indica que esta clase es un servicio de Spring
public class EstudianteServicio implements IEstudianteServicio {
    @Autowired // Inyecta la dependencia del repositorio de estudiantes
    private EstudianteRepositorio estudianteRepositorio; // Repositorio de estudiantes

    @Override
    public List<Alumnos2025> listarEstudiantes() {
        // Lógica para listar todos los estudiantes
        List<Alumnos2025> estudiantes = estudianteRepositorio.findAll();
        return estudiantes;

        // Forma mas avanzada
        // return estudianteRepositorio.findAll();
    }

    @Override
    public Alumnos2025 buscarEstudiantePorId(Integer idEstudiante) {
        // Lógica para buscar un estudiante por su ID
        // Forma basica, tiene el mismo resultado que la forma avanzada
        Alumnos2025 estudiante = estudianteRepositorio.findById(idEstudiante).orElse(null);
        return estudiante;

        // Esta forma es mas avanzada y maneja mejor el Optional
        // return estudianteRepositorio.findById(idEstudiante).orElse(null);
    }

    @Override
    public void guardarEstudiante(Alumnos2025 estudiante) {
        // Lógica para guardar un estudiante
        estudianteRepositorio.save(estudiante);
    }

    @Override
    public void eliminarEstudiante(Alumnos2025 estudiante) {
        // Lógica para eliminar un estudiante
        estudianteRepositorio.delete(estudiante);
    }

}