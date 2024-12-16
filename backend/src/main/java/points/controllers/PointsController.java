package points.controllers;

import jakarta.ejb.EJB;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import points.entity.PointRequestDTO;
import points.models.PointsService;

@Path("/api/points")
public class PointsController {
    @Context
    private HttpHeaders httpHeaders;
    @EJB
    PointsService pointsService;
    @GET
    public Response points(@Context ContainerRequestContext requestContext) {
        String username = (String) requestContext.getProperty("username");
        try {
            String results = pointsService.getHistory(username);
            return Response.ok().entity(results).build();
        }catch (Exception e){
            return Response
                    .status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
    @Path("/check")
    @POST
    public Response check(@Context ContainerRequestContext requestContext,PointRequestDTO pointRequestDTO) {
        String username = (String) requestContext.getProperty("username");
        try {
            String result = pointsService.checkPoint(username, pointRequestDTO);
            return Response.status(Response.Status.CREATED).entity(result).build();
        } catch (IllegalArgumentException e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
}
