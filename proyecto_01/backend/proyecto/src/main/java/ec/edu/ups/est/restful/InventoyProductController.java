package ec.edu.ups.est.restful;


import ec.edu.ups.est.database.service.ProductService;
import ec.edu.ups.est.model.FrameOutResponse;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Slf4j
public class InventoyProductController {

    //@Inject
    //JsonWebToken jwt;

    @Inject
    ProductService productService;

    @GET
    @Path("/search")
    @RolesAllowed({ "user", "admin" })
    public Response searchProducts(
            @QueryParam("productName") String productName,
            @QueryParam("minPrice") BigDecimal minPrice,
            @QueryParam("maxPrice") BigDecimal maxPrice,
            @QueryParam("category") String category,
            @QueryParam("subcategory") String subcategory,
            @Context SecurityContext ctx) {

        //String username = jwt.getName();
        //log.info("Username: {}", username);

        FrameOutResponse response = productService.findAdvanced(productName, minPrice, maxPrice, category, subcategory);
        return Response.ok(response).build();
    }
}
