package auth.entity;

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
public class UserEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = -517087502067735653L;

    private Long id;

    @JsonProperty("username")
    private String username;

    @JsonProperty("passwordHash")
    private String passwordHash;

    public UserEntity(UserDTO userDTO){
        super();
        this.username = userDTO.getUsername();
    }
}
