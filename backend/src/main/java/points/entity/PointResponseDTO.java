package points.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PointResponseDTO {
    private double x;
    private double y;
    private double r;
    boolean isHit;
    private String time;
    private long executionTime;
    public PointResponseDTO(PointRequestDTO pointRequestDTO){
        super();
        this.x = pointRequestDTO.getX();
        this.y = pointRequestDTO.getY();
        this.r = pointRequestDTO.getR();
    }
    public PointResponseDTO(PointEntity pointEntity){
        super();
        this.x = pointEntity.getX();
        this.y = pointEntity.getY();
        this.r = pointEntity.getR();
        this.isHit = pointEntity.isInHit();
        this.time = pointEntity.getTime();
        this.executionTime = pointEntity.getExecutionTime();
    }
}
