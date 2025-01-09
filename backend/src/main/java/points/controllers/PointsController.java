package points.controllers;

import auth.models.JwtTokenService;
import jakarta.ejb.EJB;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Cookie;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import points.entity.PointRequestDTO;
import points.models.PointsService;

@Path("/api/points")
public class PointsController {
    @Context
    private HttpHeaders httpHeaders;
    @EJB
    PointsService pointsService;
    @EJB
    JwtTokenService jwtTokenService;
    @GET
    public Response points() {
        Cookie username = httpHeaders.getCookies().get("auth_token");
        try {
            String results = pointsService.getHistory(jwtTokenService.getUsernameFromToken(username.getValue()));
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
    public Response check(PointRequestDTO pointRequestDTO) {
        Cookie username = httpHeaders.getCookies().get("auth_token");
        try {
            String result = pointsService.checkPoint(jwtTokenService.getUsernameFromToken(username.getValue()), pointRequestDTO);
            return Response.status(Response.Status.CREATED).entity(result).build();
        } catch (IllegalArgumentException e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
}
