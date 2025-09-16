package utn.estudiantes.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity // Indica que esta clase es una entidad de JPA
// boilerplate - codigo repetitivo
@Data // Genera automaticamente getters, setters, toString, equals y hashCode
@NoArgsConstructor // Genera automaticamente un constructor sin argumentos (vacio)
@AllArgsConstructor // Genera automaticamente un constructor con todos los argumentos
@ToString // Genera automaticamente el metodo toString
public class Alumnos2025 {
    @Id // Indica que este campo es la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Indica que el valor de este campo se genera automaticamente
    private Integer idalumnos2025;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
}
