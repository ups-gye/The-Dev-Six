package ec.edu.ups.est.websocket.service;

import ec.edu.ups.est.database.entity.*;
import ec.edu.ups.est.websocket.socket.NotificationSocket;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class InventoryNotificationService {

    @Inject
    NotificationSocket chatSocket;


    public void notifyProductAdded(Product product) {
        String message = "Producto agregado al inventario: " + product.getNombreProducto();
        chatSocket.broadcastNotification(message);
    }

    public void notifyProductDeleted(String productId) {
        String message = "Producto eliminado del inventario: " + productId;
        chatSocket.broadcastNotification(message);
    }

    public void notifyStockChange(Product product) {
        String message = "Cambio en la disponibilidad del producto: " + product.getNombreProducto() + ", Nuevo stock: " + product.getStock();
        chatSocket.broadcastNotification(message);
    }

    public void notifyPriceUpdate(Product product) {
        String message = "Actualización de precio del producto: " + product.getNombreProducto() + ", Nuevo precio: " + product.getPrecioUnitario();
        chatSocket.broadcastNotification(message);
    }

}
