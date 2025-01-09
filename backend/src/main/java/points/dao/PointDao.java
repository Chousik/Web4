package points.dao;

import co.elastic.clients.elasticsearch._types.Refresh;
import config.ElasticsearchClientProvider;
import points.entity.PointEntity;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Stateless
public class PointDao {

    @Inject
    private ElasticsearchClientProvider clientProvider;

    private static final String INDEX = "points";

    public void addPoint(PointEntity point) {
        try {
            ElasticsearchClient client = clientProvider.getClient();

            client.index(i -> i
                    .index(INDEX)
                    .id(null)
                    .document(point)
                    .refresh(Refresh.True)
            );

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<PointEntity> getPoints(String username) {
        try {
            ElasticsearchClient client = clientProvider.getClient();

            SearchResponse<PointEntity> response = client.search(s -> s
                            .index(INDEX)
                            .query(q -> q.term(t -> t
                                            .field("username")
                                            .value(v -> v.stringValue(username))
                                    )
                            )
                            .size(1000),
                    PointEntity.class
            );

            return response.hits().hits()
                    .stream()
                    .map(Hit::source)
                    .collect(Collectors.toList());

        } catch (IOException e) {
            e.printStackTrace();
            return List.of();
        }
    }
}
