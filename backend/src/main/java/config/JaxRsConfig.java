package config;

import auth.controllers.AuthController;
import common.JwtAuthFilter;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import points.controllers.PointsController;

import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
public class JaxRsConfig extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> set = new HashSet<>();
        set.add(AuthController.class);
        set.add(PointsController.class);
        set.add(JwtAuthFilter.class);
        return set;
    }
}

