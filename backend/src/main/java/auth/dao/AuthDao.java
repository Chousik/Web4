package auth.dao;

import auth.entity.UserEntity;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceException;
import jakarta.transaction.Transactional;

@Stateless
public class AuthDao {
    @PersistenceContext(name = "PostgresPU")
    private EntityManager entityManager;

    @Transactional
    public boolean addUser(UserEntity user) {
        try {
            if (isUsernameExists(user.getUsername())) {
                return false;
            }
            entityManager.persist(user);
            return true;
        }catch (Throwable e) {
            return false;
        }
    }

    private boolean isUsernameExists(String username) {
        try {
            Long count = entityManager.createQuery(
                            "SELECT COUNT(u) FROM UserEntity u WHERE u.username = :username", Long.class)
                    .setParameter("username", username)
                    .getSingleResult();
            return count > 0;
        } catch (PersistenceException e) {
            e.printStackTrace();
            return false;
        }
    }
    @Transactional
    public String getHashPassword(String username) {
        try {
            return entityManager.createQuery(
                            "SELECT u.passwordHash FROM UserEntity u WHERE u.username = :username", String.class)
                    .setParameter("username", username)
                    .getSingleResult();
        } catch (PersistenceException e) {
            return null;
        }
    }
}
