package ec.edu.ups.est.database.service;

import ec.edu.ups.est.database.entity.Product;
import ec.edu.ups.est.database.repository.ProductRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class ProductService {


    @Inject
    ProductRepository productRepository;

    @Transactional
    public Product createProduct(Product product) {
        productRepository.persist(product);
        return product;
    }

    @Transactional
    public Product editarProducto(String codigoProducto, Product datosActualizados) {
        Product producto = productRepository.findById(codigoProducto);
        if (producto != null) {
            if(datosActualizados.getNombreProducto()!=null){
                producto.setNombreProducto(datosActualizados.getNombreProducto());
            }
            if(datosActualizados.getStock()!=null){
                producto.setStock(datosActualizados.getStock());
            }
            if(datosActualizados.getPrecioUnitario()!=null){
                producto.setPrecioUnitario(datosActualizados.getPrecioUnitario());
            }
            if(datosActualizados.getCategoria()!=null){
                producto.setCategoria(datosActualizados.getCategoria());
            }
            if(datosActualizados.getSubcategoria()!=null){
                producto.setSubcategoria(datosActualizados.getSubcategoria());
            }
            if(datosActualizados.getProveedor()!=null){
                producto.setProveedor(datosActualizados.getProveedor());
            }
            productRepository.persist(producto);
        }
        return producto;
    }


    @Transactional
    public void deleteProduct(String idProduct) {
        productRepository.deleteById(idProduct);
    }

    public List<Product> listarProductos() {
        return productRepository.listAll();
    }

    public List<Product> listarPorCategoria(String categoria) {
        return productRepository.find("categoria", categoria).list();
    }

    public List<Product> listarPorSubcategoria(String subcategoria) {
        return productRepository.find("subcategoria", subcategoria).list();
    }
}
