package auth.models;

import auth.dao.AuthDao;
import auth.entity.UserDTO;
import auth.entity.UserEntity;
import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;

import javax.naming.AuthenticationException;
import javax.security.auth.login.LoginException;

@Stateless
public class AuthService {
    @EJB
    AuthDao authDao;
    @EJB
    HashService hashService;
    @EJB
    JwtTokenService jwtTokenService;
    public String login(UserDTO user) throws AuthenticationException{
        String hashPassword = authDao.getHashPassword(user.getUsername());
        if (hashPassword == null){
            throw  new AuthenticationException("Неверный логин или пароль");
        }

        if (!hashService.verifyPassword(user.getPassword(), hashPassword)){
            throw  new AuthenticationException("Неверный логин или пароль");
        }
        return jwtTokenService.generateToken(user.getUsername());
    }
    public String register(UserDTO user) throws LoginException {
        UserEntity userE = new UserEntity(user);
        userE.setPasswordHash(hashService.hashPassword(user.getPassword()));
        if (!authDao.addUser(userE)){
            throw new LoginException("Данный логин уже сущестует!!");
        }
        return jwtTokenService.generateToken(userE.getUsername());
    }
}
