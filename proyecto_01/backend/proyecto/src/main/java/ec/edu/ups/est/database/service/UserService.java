package ec.edu.ups.est.database.service;

import ec.edu.ups.est.database.entity.UserEntity;
import ec.edu.ups.est.database.repository.UserRepository;
import ec.edu.ups.est.websocket.service.InventoryNotificationService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@ApplicationScoped
@Slf4j
@Transactional
public class UserService {


    @Inject
    UserRepository userRepository;

    @Inject
    InventoryNotificationService notificationService;

    public void createUser(UserEntity user) {
        userRepository.persist(user);
    }

    public Optional<UserEntity> authenticateUser(String email, String password) {
        Optional<UserEntity> userOptional = userRepository.loginUser(email, password);
        if(userOptional.isEmpty()){
            log.info("No se encuentro usuario : " + email);
        }
        return userOptional;
    }


}
