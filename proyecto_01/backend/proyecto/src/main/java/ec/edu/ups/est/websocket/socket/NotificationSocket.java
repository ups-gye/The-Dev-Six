package ec.edu.ups.est.websocket.socket;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/notifications")
@ApplicationScoped
public class NotificationSocket {

    Map<String, Session> sessions = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session) {
        sessions.put(session.getId(), session);
        System.out.println("WebSocket abierto: " + session.getId());
    }

    /*@OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("Mensaje recibido: " + message);
        session.getAsyncRemote().sendText("Servidor: " + message);
    }*/

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session.getId());
        System.out.println("WebSocket cerrado: " + session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        sessions.remove(session.getId());
        System.out.println("Error en WebSocket: " + throwable.getMessage());
    }

    public void broadcastNotification(String message) {
        sessions.values().forEach(session -> {
            session.getAsyncRemote().sendText(message);
        });
    }

}
