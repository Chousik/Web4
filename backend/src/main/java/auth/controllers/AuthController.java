package auth.controllers;

import auth.entity.UserDTO;
import auth.models.AuthService;
import auth.models.JwtTokenService;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

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
    public Response status() {
        Cookie authToken = httpHeaders.getCookies().get("auth_token");
        boolean isAuth = false;
        if (authToken!=null){
            isAuth = jwtTokenService.validateToken(authToken.getValue());
        }
        if (isAuth){
            String response = "{\"isAuthenticated\":\"true\"}";
            return Response
                    .ok()
                    .entity(response)
                    .build();
        }else {
            String errorResponse = "{\\\"isAuthenticated\\\":\\\"\"false\"\\\" , \"error\":\"Не авторизован\"}";
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .entity(errorResponse)
                    .build();
        }
    }

    @POST
    @Path("/logout")
    public Response logout() {
        Cookie authToken = httpHeaders.getCookies().get("auth_token");
        boolean isAuth = false;
        if (authToken!=null){
            isAuth = jwtTokenService.validateToken(authToken.getValue());
        }
        if (isAuth) {
            String jsonResponse = "{\"success\": true}";
            NewCookie cookie = new NewCookie(
                    "auth_token",
                    "",
                    "/",
                    null,
                    "JWT Token",
                    0,
                    false,
                    true
            );
            return Response
                    .status(Response.Status.CREATED)
                    .cookie(cookie)
                    .entity(jsonResponse)
                    .build();
        }else {
            String errorResponse = "{\\\"isAuthenticated\\\":\\\"\"false\"\\\" , \"error\":\"NoAuth\"}";
            return Response
                    .status(Response.Status.UNAUTHORIZED)
                    .entity(errorResponse)
                    .build();
        }
    }
}
