package points.entity;

import jakarta.persistence.*;
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
@Entity
@Table(name = "points")
public class PointEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = -5170875020617735653L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable=false, unique=true)
    private Long id;

    @Column(name = "x", nullable=false)
    private double x;

    @Column(name = "y", nullable=false)
    private double y;

    @Column(name = "r", nullable=false)
    private double r;

    @Column(name = "in_flag", nullable=false)
    private boolean inHit;

    @Column(name = "time", nullable=false)
    private String time;

    @Column(name = "execution_time", nullable=false)
    private long executionTime;

    @Column(name = "username", nullable = false)
    private String username;
    public PointEntity(PointResponseDTO pointResponseDTO,
                       String username){
        super();
        this.x = pointResponseDTO.getX();
        this.y = pointResponseDTO.getY();
        this.r = pointResponseDTO.getR();
        this.inHit = pointResponseDTO.isHit;
        this.time = pointResponseDTO.getTime();
        this.executionTime = pointResponseDTO.getExecutionTime();
        this.username = username;
    }
}
