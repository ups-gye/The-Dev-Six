package ec.edu.ups.est.database.entity;



import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "usuarios")
@RegisterForReflection
@Data
public class UserEntity {
    private String name;

    @Id
    private String email;

    private String password;

    private String role;

}
