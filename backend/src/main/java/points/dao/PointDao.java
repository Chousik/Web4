package points.dao;

import co.elastic.clients.elasticsearch._types.Refresh;
import config.ElasticsearchClientProvider;
import points.entity.DataCache;
import points.entity.PointEntity;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Stateless
public class PointDao {

    private final HashMap<String, DataCache> userPoints = new HashMap<>();
    @Inject
    private ElasticsearchClientProvider clientProvider;

    private static final String INDEX = "points";

    public void addPoint(PointEntity point) {
        try {
            DataCache cache = userPoints.get(point.getUsername());
            ElasticsearchClient client = clientProvider.getClient();

            client.index(i -> i
                    .index(INDEX)
                    .id(null)
                    .document(point)
                    .refresh(Refresh.True)
            );
            if (cache != null){
                cache.getPointEntities().add(point);
//                cache.setTime(System.currentTimeMillis()); Убрал, т.к. мб ну не только наше прилоожение взимодействует
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<PointEntity> getPoints(String username) {
        try {
            List<PointEntity> data;
            ElasticsearchClient client = clientProvider.getClient();
            DataCache cache = userPoints.get(username);
            if (cache == null || System.currentTimeMillis()-cache.getTime()>2*60*1000){
                if (cache != null){
                    userPoints.remove(username);
                }
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
                data = response.hits().hits()
                        .stream()
                        .map(Hit::source)
                        .collect(Collectors.toList());
                userPoints.put(username, new DataCache(data, System.currentTimeMillis()));
            }else {
                data = cache.getPointEntities();
            }

            return data;

        } catch (IOException e) {
            e.printStackTrace();
            return List.of();
        }
    }
}
