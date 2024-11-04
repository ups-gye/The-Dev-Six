package ec.edu.ups.est.database.repository;

import ec.edu.ups.est.database.entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserRepository implements PanacheRepositoryBase <User, String>{
}
