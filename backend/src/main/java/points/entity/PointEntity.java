package points.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@EqualsAndHashCode
@RequiredArgsConstructor
@Getter
@Setter
public class PointEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = -5170875020617735653L;

    private String id;

    private double x;
    private double y;
    private double r;

    @JsonProperty("in_flag")
    private boolean inHit;

    private String time;
    private long executionTime;
    private String username;

    public PointEntity(PointResponseDTO pointResponseDTO,
                       String username){
        super();
        this.x = pointResponseDTO.getX();
        this.y = pointResponseDTO.getY();
        this.r = pointResponseDTO.getR();
        this.inHit = pointResponseDTO.isHit();
        this.time = pointResponseDTO.getTime();
        this.executionTime = pointResponseDTO.getExecutionTime();
        this.username = username;
    }
}
