package ec.edu.ups.est.database.service;

import ec.edu.ups.est.database.entity.Product;
import ec.edu.ups.est.database.repository.ProductRepository;
import ec.edu.ups.est.websocket.service.InventoryNotificationService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class ProductService {


    @Inject
    ProductRepository productRepository;

    @Inject
    InventoryNotificationService notificationService;

    @Transactional
    public Product createProduct(Product product) {
        productRepository.persist(product);
        notificationService.notifyProductAdded(product);
        return product;
    }

    @Transactional
    public Product editarProducto(String codigoProducto, Product datosActualizados) {
        Product producto = productRepository.findById(codigoProducto);
        if (producto != null) {

            boolean stockChanged = false;
            boolean priceChanged = false;

            if(datosActualizados.getNombreProducto()!=null){
                producto.setNombreProducto(datosActualizados.getNombreProducto());
            }
            if(datosActualizados.getStock()!=null && !datosActualizados.getStock().equals(producto.getStock())){
                producto.setStock(datosActualizados.getStock());
                stockChanged = true;
            }
            if(datosActualizados.getPrecioUnitario()!=null && !datosActualizados.getPrecioUnitario().equals(producto.getPrecioUnitario())){
                producto.setPrecioUnitario(datosActualizados.getPrecioUnitario());
                priceChanged = true;
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

            if (stockChanged) {
                notificationService.notifyStockChange(producto);
            }
            if (priceChanged) {
                notificationService.notifyPriceUpdate(producto);
            }
        }
        return producto;
    }


    @Transactional
    public void deleteProduct(String idProduct) {
        productRepository.deleteById(idProduct);
        notificationService.notifyProductDeleted(idProduct);
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
