package points.models;

import com.google.gson.Gson;
import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import points.dao.PointDao;
import points.entity.PointEntity;
import points.entity.PointRequestDTO;
import points.entity.PointResponseDTO;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Stateless
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PointsService {
    @EJB
    CheckService checkService;
    @EJB
    PointDao pointDao;
    public String getHistory(String username) {
        List<PointEntity> pointEntities = pointDao.getPoints(username);
        List<PointResponseDTO> pointResponseDTOS = pointEntities
                .stream().map(PointResponseDTO::new).toList();
        Gson gson = new Gson();
        return gson.toJson(pointResponseDTOS);
    }
    public String checkPoint(String username, PointRequestDTO pointRequestDTO) throws IllegalArgumentException{
        long startTime = System.nanoTime();
        if (!checkService.valid(pointRequestDTO)){
            throw new IllegalArgumentException("Запрос содержит неверные аргументы");
        }
        PointResponseDTO pointResponseDTO = new PointResponseDTO(pointRequestDTO);
        pointResponseDTO.setHit(checkService.check(pointRequestDTO));
        String dateNow = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        pointResponseDTO.setTime(dateNow);
        pointResponseDTO.setExecutionTime(System.nanoTime() - startTime);
        PointEntity pointEntity = new PointEntity(pointResponseDTO, username);
        pointDao.addPoint(pointEntity);
        Gson gson = new Gson();
        return gson.toJson(pointResponseDTO);
    }
}
