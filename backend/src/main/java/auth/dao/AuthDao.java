package auth.dao;

import auth.entity.UserEntity;
import co.elastic.clients.elasticsearch._types.Refresh;
import config.ElasticsearchClientProvider;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;
import java.util.List;

@Stateless
@Setter
@Log4j2
public class AuthDao {

    @Inject
    private ElasticsearchClientProvider clientProvider;

    private static final String INDEX = "users";

    public boolean addUser(UserEntity user) {
        try {
            if (isUsernameExists(user.getUsername())) {
                return false;
            }

            ElasticsearchClient client = clientProvider.getClient();

            IndexResponse response = client.index(i -> i
                    .index(INDEX)
                    .id(user.getUsername())
                    .document(user)
                    .refresh(Refresh.True)
            );

            return response.result().jsonValue() != null;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean isUsernameExists(String username) {
        try {
            ElasticsearchClient client = clientProvider.getClient();

            SearchResponse<UserEntity> response = client.search(s -> s
                            .index(INDEX)
                            .query(q -> q
                                    .term(t -> t
                                            .field("username.keyword")
                                            .value(v -> v.stringValue(username))
                                    )
                            )
                            .size(1),
                    UserEntity.class
            );

            List<Hit<UserEntity>> hits = response.hits().hits();
            return !hits.isEmpty();
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public String getHashPassword(String username) {
        try {
            ElasticsearchClient client = clientProvider.getClient();

            SearchResponse<UserEntity> response = client.search(s -> s
                            .index(INDEX)
                            .query(q -> q
                                    .term(t -> t
                                            .field("username.keyword")
                                            .value(v -> v.stringValue(username))
                                    )
                            )
                            .size(1),
                    UserEntity.class
            );

            List<Hit<UserEntity>> hits = response.hits().hits();
            if (hits.isEmpty()) {
                return null;
            }

            return hits.get(0).source().getPasswordHash();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
