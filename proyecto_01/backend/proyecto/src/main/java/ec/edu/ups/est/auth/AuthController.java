package ec.edu.ups.est.auth;

import ec.edu.ups.est.database.service.UserService;
import ec.edu.ups.est.model.FrameOutResponse;

import io.quarkus.security.identity.SecurityIdentity;
import io.smallrye.jwt.build.Jwt;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.jwt.Claims;
import org.jboss.resteasy.reactive.RestResponse;
import ec.edu.ups.est.database.entity.UserEntity;

import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Path("/auth")
@Slf4j
public class AuthController {

    @Inject
    SecurityIdentity securityIdentity;

    @Inject
    UserService service;

    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Map<String,String> user) {
        /*Set<String> roles = new HashSet<>();
        if (username.equals("admin")) {
            roles.add("admin");
        } else {
            roles.add("user");
        }

        String token = Jwt.issuer("https://example.com/issuer")
                .upn("jdoe@quarkus.io")
                .groups(roles)
                .claim(Claims.birthdate.name(), "2001-07-13")
                .sign();*/

        FrameOutResponse response = loginUser(user);

        return Response.ok().entity(response).build();
    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/adduser")
    public Response addNewUser(UserEntity user){
        FrameOutResponse response = addNewUserProcces(user);
        return Response.ok().entity(response).build();
    }

    public FrameOutResponse addNewUserProcces(UserEntity user){
        FrameOutResponse frameOutResponse = new FrameOutResponse();
        try{
            UserEntity u = new UserEntity();
            u.setName(user.getName());
            u.setRole(user.getRole());
            u.setPassword(user.getPassword());
            u.setEmail(user.getEmail());
            service.createUser(u);
            frameOutResponse.setCode("00");
            frameOutResponse.setMessage("OK");
            return frameOutResponse;
        }catch (Exception e){
            frameOutResponse.setCode("99");
            frameOutResponse.setMessage("ERROR AL REGISTRAR USUARIO");
            e.printStackTrace();
            return frameOutResponse;
        }
    }



    public FrameOutResponse loginUser(Map<String,String> user){
        String email = user.get("email");
        String password = user.get("password");

        Optional<UserEntity> userFind = service.authenticateUser(email,password);

        FrameOutResponse frameOutResponse = new FrameOutResponse();
        if(userFind.isPresent()){
            UserEntity userEntity = userFind.get();
            log.info("Usuario autenticado: " + email);
            frameOutResponse.setCode("00");
            frameOutResponse.setMessage("OK");
            String token = generateToken(userEntity.getRole());
            frameOutResponse.setToken(token);
            frameOutResponse.setFrame(userEntity);
            return frameOutResponse;
        }else{
            log.info("Credenciales incorrectas: ");
            frameOutResponse.setCode("98");
            frameOutResponse.setMessage("CREDENCIALES INCORRECTAS");
            return frameOutResponse;
        }
    }

    private String generateToken(String role){

        Set<String> roles = new HashSet<>();

        if (role.equals("admin")) {
            roles.add("admin");
        } else {
            roles.add("user");
        }

        String token = Jwt.issuer("https://example.com/issuer")
                .upn("jdoe@quarkus.io")
                .groups(roles)
                .claim(Claims.birthdate.name(), "2001-07-13")
                .sign();

        return token;
    }
}
