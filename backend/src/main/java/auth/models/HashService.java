package auth.models;


import at.favre.lib.crypto.bcrypt.BCrypt;
import jakarta.ejb.Stateless;

@Stateless
public class HashService {
    private static final String PEPPER = "HiRailaMartin"; //If you see it, P3210 love you!

    public String hashPassword(String plainPassword) {
        String passwordWithPepper = plainPassword + PEPPER;
        return BCrypt.withDefaults().hashToString(12, passwordWithPepper.toCharArray());
    }

    public boolean verifyPassword(String plainPassword, String hashedPassword) {
        String passwordWithPepper = plainPassword + PEPPER;
        return BCrypt.verifyer().verify(passwordWithPepper.toCharArray(), hashedPassword).verified;
    }
}
