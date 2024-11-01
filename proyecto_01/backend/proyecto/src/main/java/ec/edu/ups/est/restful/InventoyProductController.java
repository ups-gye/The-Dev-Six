package ec.edu.ups.est.restful;

import ec.edu.ups.est.database.entity.Product;
import ec.edu.ups.est.database.service.ProductService;
import ec.edu.ups.est.model.FrameOutResponse;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.math.BigDecimal;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class InventoyProductController {

    @Inject
    ProductService productService;

    @GET
    @Path("/search")
    public Response searchProducts(
            @QueryParam("productName") String productName,
            @QueryParam("minPrice") BigDecimal minPrice,
            @QueryParam("maxPrice") BigDecimal maxPrice,
            @QueryParam("category") String category,
            @QueryParam("subcategory") String subcategory) {

        FrameOutResponse response = productService.findAdvanced(productName, minPrice, maxPrice, category, subcategory);
        return Response.ok(response).build();
    }
}
