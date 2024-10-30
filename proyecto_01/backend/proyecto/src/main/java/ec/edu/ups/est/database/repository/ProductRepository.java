package ec.edu.ups.est.database.repository;

import ec.edu.ups.est.database.entity.Product;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProductRepository implements PanacheRepositoryBase <Product, String>{
}
