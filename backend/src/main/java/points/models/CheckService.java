package points.models;

import jakarta.ejb.Stateless;
import points.entity.PointRequestDTO;

import java.io.Serializable;

@Stateless
public class CheckService implements Serializable {
    private static final double MAX_R = 5;
    private static final double MIN_R = 1;
    private static final double MIN_X = -3;
    private static final double MAX_X = 5;
    private static final double MAX_ABS_Y = 5;


    public boolean valid(PointRequestDTO pointRequestDTO) {
        double x = pointRequestDTO.getX();
        double y = pointRequestDTO.getY();
        double r = pointRequestDTO.getR();

        boolean xValid = MIN_X <= x && x <= MAX_X;
        boolean yValid = y*y <= MAX_ABS_Y*MAX_ABS_Y;
        boolean rValid = MIN_R <= r && r <= MAX_R;

        return xValid || yValid || rValid;
    }

    public boolean check(PointRequestDTO pointRequestDTO) {
        double x = pointRequestDTO.getX();
        double y = pointRequestDTO.getY();
        double r = pointRequestDTO.getR();

        boolean itTriangle = (x <= 0 && y >= 0 && (x + r) >= y);
        boolean itCircle = (x <= 0 && y <= 0 && (x * x + y * y) <= r*r);
        boolean itRectangle = (x >= 0 && x <= r/2 && y < 0 && y > -r);

        return itTriangle || itCircle || itRectangle;
    }
}
