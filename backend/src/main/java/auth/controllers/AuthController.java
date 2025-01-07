package auth.controllers;

import auth.entity.UserDTO;
import auth.models.AuthService;
import auth.models.JwtTokenService;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import points.models.PointsService;

import javax.naming.AuthenticationException;
import javax.security.auth.login.LoginException;

@Path("/api/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthController {
    @EJB
    AuthService authService;
    @Context
    private HttpHeaders httpHeaders;
    @EJB
    JwtTokenService jwtTokenService;

    @Path("/login")
    @POST
    public Response login(UserDTO user) {
        try {
            String jwtToken = authService.login(user);
            NewCookie cookie = new NewCookie(
                    "auth_token",
                    jwtToken,
                    "/",
                    null,
                    "JWT Token",
                    3600,
                    false,
                    true
            );
            // Добавляем JSON-ответ
            String jsonResponse = "{\"success\": true}";
            return Response
                    .status(Response.Status.CREATED)
                    .cookie(cookie)
                    .entity(jsonResponse)
                    .build();
        } catch (AuthenticationException e) {
            String errorResponse = "{\"error\":\"" + e.getMessage() + "\"}";
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .entity(errorResponse)
                    .build();
        }
    }

    @Path("/register")
    @POST
    public Response register(UserDTO user) {
        try {
            String jwtToken = authService.register(user);
            NewCookie cookie = new NewCookie(
                    "auth_token",
                    jwtToken,
                    "/",
                    null,
                    "JWT Token",
                    3600,
                    false,
                    true
            );
            // Добавляем JSON-ответ
            String jsonResponse = "{\"success\": true}";
            return Response
                    .status(Response.Status.CREATED)
                    .cookie(cookie)
                    .entity(jsonResponse)
                    .build();
        } catch (LoginException e) {
            String errorResponse = "{\"error\":\"" + e.getMessage() + "\"}";
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .entity(errorResponse)
                    .build();
        }
    }
    @GET
    @Path("/status")
    public Response points() {
        Cookie authToken = httpHeaders.getCookies().get("auth_token");
        boolean isAuth = false;
        if (authToken!=null){
            isAuth = jwtTokenService.validateToken(authToken.getValue());
        }
        String response = "{\"isAuthenticated\":\"" + isAuth + "\"}";
        return Response
                .ok()
                .entity(response)
                .build();
    }
}
