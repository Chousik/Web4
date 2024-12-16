package auth.controllers;

import auth.entity.UserDTO;
import auth.models.AuthService;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;

import javax.naming.AuthenticationException;
import javax.security.auth.login.LoginException;

@Path("/api/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthController {
    @EJB
    AuthService authService;
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
            return Response
                    .status(Response.Status.CREATED)
                    .cookie(cookie)
                    .build();
        } catch (AuthenticationException e) {
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
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
            return Response
                    .status(Response.Status.CREATED)
                    .cookie(cookie)
                    .build();
        } catch (LoginException e) {
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }

    }
}
