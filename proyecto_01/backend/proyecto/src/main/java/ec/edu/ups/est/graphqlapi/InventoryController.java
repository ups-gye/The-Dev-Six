package ec.edu.ups.est.graphqlapi;

import ec.edu.ups.est.database.entity.Product;
import ec.edu.ups.est.database.service.ProductService;
import ec.edu.ups.est.security.Secured;
import jakarta.inject.Inject;
import org.eclipse.microprofile.graphql.*;

import java.util.List;

@GraphQLApi
public class InventoryController {

    @Inject
    ProductService productService;

    @Query("allProducts")
    @Description("Get all products")
    public List<Product> geAlltProducts() {
        return productService.listarProductos();
    }

    @Mutation
    @Description("Add a new product")
    @Secured
    public Product addProduct(Product product) {
        return productService.createProduct(product);
    }

    @Mutation
    @Description("Delete a product by ID")
    @Secured
   public boolean deleteProduct(String productId) {
        try {
            productService.deleteProduct(productId);
            return true;
        }catch (Exception e){
            return false;
        }
   }

    @Mutation
    @Description("Update a product by ID")
    @Secured
   public Product updateProduct(String productId,Product product) {
        return  productService.editarProducto(productId,product);
   }
}
