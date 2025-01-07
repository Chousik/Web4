package common;

import auth.models.JwtTokenService;
import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;

@Provider
public class JwtAuthFilter implements ContainerRequestFilter {
    JwtTokenService jwtTokenService;
    public JwtAuthFilter(JwtTokenService jwtTokenService){
        this.jwtTokenService = jwtTokenService;
    }

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        String path = requestContext.getUriInfo().getPath();
        if (!path.contains("points")) {
            return;
        }
        String token = null;
        if (requestContext.getCookies().containsKey("auth_token")) {
            token = requestContext.getCookies().get("auth_token").getValue();
        }

        if (token == null || !jwtTokenService.validateToken(token)) {
            requestContext.abortWith(
                    Response.status(Response.Status.SEE_OTHER)
                            .location(java.net.URI.create("/login"))
                            .build()
            );
        }else {
        String username = jwtTokenService.getUsernameFromToken(token);
        requestContext.setProperty("username", username);}
    }
}
