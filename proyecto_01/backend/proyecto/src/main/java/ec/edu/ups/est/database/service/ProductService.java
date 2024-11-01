package ec.edu.ups.est.database.service;

import ec.edu.ups.est.database.entity.Product;
import ec.edu.ups.est.database.repository.ProductRepository;
import ec.edu.ups.est.model.FrameOutResponse;
import ec.edu.ups.est.websocket.service.InventoryNotificationService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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


    public FrameOutResponse findAdvanced(String productName, BigDecimal minPrice, BigDecimal maxPrice, String category, String subcategory) {

        FrameOutResponse frameOutResponse = new FrameOutResponse();

        StringBuilder query = new StringBuilder("1=1");
        Map<String, Object> params = new HashMap<>();

        if (productName != null && !productName.isEmpty()) {
            query.append(" AND LOWER(nombreProducto) LIKE LOWER(:nombreProducto)");
            params.put("nombreProducto", "%" + productName + "%");
        }
        if (minPrice != null) {
            query.append(" AND precioUnitario >= :minPrecioUnitario");
            params.put("minPrecioUnitario", minPrice);
        }
        if (maxPrice != null) {
            query.append(" AND precioUnitario <= :maxPrecioUnitario");
            params.put("maxPrecioUnitario", maxPrice);
        }
        if (category != null && !category.isEmpty()) {
            query.append(" AND LOWER(categoria) = LOWER(:categoria)");
            params.put("categoria", category);
        }
        if (subcategory != null && !subcategory.isEmpty()) {
            query.append(" AND LOWER(subcategoria) = LOWER(:subcategoria)");
            params.put("subcategoria", subcategory);
        }

        frameOutResponse.setCode("00");
        frameOutResponse.setMessage("OK");
        frameOutResponse.setFrame(productRepository.find(String.valueOf(query), params).list());

        return frameOutResponse;
    }


}
