package ec.edu.ups.est.database.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;


@Entity
@Table(name = "usuarios")
public class User {

    @Id
    @Size(max = 20)
    @NotBlank
    @Column(name = "id_usuario", length = 20, nullable = false, unique = true)
    private String idUsuario;

    @Size(max = 50)
    @NotBlank
    @Column(name = "nombre", length = 50, nullable = false)
    private String nombre;

    @Size(max = 50)
    @Column(name = "correo", length = 50, nullable = false)
    private String correo;

    @Size(max = 50)
    @Column(name = "contrasenia", length = 50, nullable = false)
    private String contrasenia;

    @Size(max = 50)
    @Column(name = "rol", length = 50, nullable = false)
    private String rol;

    public @Size(max = 20) @NotBlank String getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(@Size(max = 20) @NotBlank String idUsuario) {
        this.idUsuario = idUsuario;
    }

    public @Size(max = 20) @NotBlank String getNombre() {
        return nombre;
    }

    public void setNombre(@Size(max = 20) @NotBlank String nombre) {
        this.nombre = nombre;
    }

    public @Size(max = 50) String getCorreo() {
        return correo;
    }

    public void setCorreo(@Size(max = 50) String correo) {
        this.correo = correo;
    }


    public @Size(max = 50) String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(@Size(max = 50) String contrasenia) {
        this.contrasenia = contrasenia;
    }


    public @Size(max = 50) String getRol() {
        return rol;
    }

    public void setRol(@Size(max = 50) String rol) {
        this.rol = rol;
    }
}
