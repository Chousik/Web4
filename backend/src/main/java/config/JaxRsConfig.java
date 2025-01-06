package config;

import auth.controllers.AuthController;
import auth.models.JwtTokenService;
import common.JwtAuthFilter;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import points.controllers.PointsController;

import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/")
public class JaxRsConfig extends Application {

    private final Set<Object> singletons = new HashSet<>();
    private final Set<Class<?>> classes = new HashSet<>();

    public JaxRsConfig() {
        classes.add(AuthController.class);
        classes.add(PointsController.class);
        classes.add(filters.CORSFilter.class);
        JwtTokenService jwtTokenService = new JwtTokenService();
        singletons.add(jwtTokenService);
        singletons.add(new JwtAuthFilter(jwtTokenService));
    }

    @Override
    public Set<Class<?>> getClasses() {
        return classes;
    }

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }
}
