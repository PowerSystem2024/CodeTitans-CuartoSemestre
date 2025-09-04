package utn.estudiantes.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.estudiantes.modelo.Estudiante;
import utn.estudiantes.repositorio.EstudianteRepositorio;

@Service // Indica que esta clase es un servicio de Spring
public class EstudianteServicio implements IEstudianteServicio {
    @Autowired // Inyecta la dependencia del repositorio de estudiantes
    private EstudianteRepositorio estudianteRepositorio; // Repositorio de estudiantes

    @Override
    public List<Estudiante> listarEstudiantes() {
        // Lógica para listar todos los estudiantes
        List<Estudiante> estudiantes = estudianteRepositorio.findAll();
        return estudiantes;
    }

    @Override
    public Estudiante buscarEstudiantePorId(Integer idEstudiante) {
        // Lógica para buscar un estudiante por su ID
        return estudianteRepositorio.findById(idEstudiante).orElse(null);
    }

    @Override
    public void guardarEstudiante(Estudiante estudiante) {
        // Lógica para guardar un estudiante
        estudianteRepositorio.save(estudiante);
    }

    @Override
    public void eliminarEstudiante(Estudiante estudiante) {
        // Lógica para eliminar un estudiante
        estudianteRepositorio.delete(estudiante);
    }

}