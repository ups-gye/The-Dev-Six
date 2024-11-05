package ec.edu.ups.est.database.repository;

import ec.edu.ups.est.database.entity.UserEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import io.quarkus.panache.common.Parameters;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;

@ApplicationScoped
public class UserRepository implements PanacheRepositoryBase <UserEntity, String>{

    public Optional<UserEntity> loginUser(String email, String password) {
        return find("email = :email and password = :password",
                Parameters.with("email", email.trim())
                        .and("password", password.trim()))
                .firstResultOptional();
    }

}
