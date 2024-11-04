package ec.edu.ups.est.database.service;

import ec.edu.ups.est.database.entity.User;
import ec.edu.ups.est.database.repository.UserRepository;
import ec.edu.ups.est.model.FrameOutResponse;
import ec.edu.ups.est.websocket.service.InventoryNotificationService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.HashMap;
import java.util.Map;

@ApplicationScoped
public class UserService {


    @Inject
    UserRepository userRepository;

    @Inject
    InventoryNotificationService notificationService;

    @Transactional
    public User createUser(User user) {
        userRepository.persist(user);
        notificationService.notifyUserAdded(user);
        return user;
    }

    public FrameOutResponse login(String userName, String password) {

        StringBuilder query = new StringBuilder("1=1");
        Map<String, Object> params = new HashMap<>();

        if (userName != null && !userName.isEmpty()) {
            query.append(" AND LOWER(nombre) = LOWER(:nombre)");
            params.put("nombre", userName);
        }

        if (password != null && !password.isEmpty()) {
            query.append(" AND LOWER(contrasenia) = LOWER(:contrasenia)");
            params.put("contrasenia", password);
        }
        FrameOutResponse frameOutResponse = new FrameOutResponse();
        User user = (User) userRepository.find(String.valueOf(query), params);


        if (user == null)
        {
            frameOutResponse.setCode("04");
            frameOutResponse.setMessage("Login error");
            frameOutResponse.setFrame("");
            notificationService.notifyLoginERROR();
        }
        else
        {
            frameOutResponse.setCode("00");
            frameOutResponse.setMessage("Login ok");
            frameOutResponse.setFrame(user.getRol());
            notificationService.notifyLoginERROR();
        }

        return frameOutResponse;
    }


}
