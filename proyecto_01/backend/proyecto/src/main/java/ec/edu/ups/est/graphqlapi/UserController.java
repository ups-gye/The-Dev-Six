package ec.edu.ups.est.graphqlapi;

import ec.edu.ups.est.database.entity.User;
import ec.edu.ups.est.database.service.UserService;
import jakarta.inject.Inject;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;


@GraphQLApi
public class UserController {

    @Inject
    UserService userService;

    @Mutation
    @Description("Add a new user")
    public User addProduct(User user) {
        return userService.createUser(user);
    }

    @Mutation
    @Description("Login user")
   public boolean login(String username, String password) {
        try {
            userService.login(username, password);
            return true;
        }catch (Exception e){
            return false;
        }
   }

}
