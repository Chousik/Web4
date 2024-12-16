package points.dao;

import auth.entity.UserEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import points.entity.PointEntity;

import java.util.ArrayList;
import java.util.List;

public class PointDao {
    @PersistenceContext(name = "PostgresPU")
    private EntityManager entityManager;
    @Transactional
    public void addPoint(PointEntity point) {
        entityManager.persist(point);
    }

    @Transactional
    public List<PointEntity> getPoints(String username) {
        return new ArrayList<>(entityManager.createQuery(
                        "SELECT p FROM points p WHERE p = :user", PointEntity.class)
                .setParameter("user", username)
                .getResultList());
    }
}
