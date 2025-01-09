package config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import jakarta.ejb.Stateless;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RestClient;
import jakarta.annotation.PreDestroy;

@Stateless
public class ElasticsearchClientProvider {
    private ElasticsearchClient client;
    private RestClient restClient;

    private static final String ELASTIC_USERNAME = "elastic";
    private static final String ELASTIC_PASSWORD = "elastic";

    public ElasticsearchClient getClient() {
        if (client == null) {
            BasicCredentialsProvider credentialsProvider = new BasicCredentialsProvider();
            credentialsProvider.setCredentials(
                    AuthScope.ANY,
                    new UsernamePasswordCredentials(ELASTIC_USERNAME, ELASTIC_PASSWORD)
            );

            restClient = RestClient.builder(
                            new HttpHost("localhost", 9200, "http")
                    )
                    .setHttpClientConfigCallback(httpClientBuilder ->
                            httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider)
                    )
                    .build();

            RestClientTransport transport = new RestClientTransport(
                    restClient, new JacksonJsonpMapper());

            client = new ElasticsearchClient(transport);
        }
        return client;
    }

    @PreDestroy
    public void close() {
        try {
            if (restClient != null) {
                restClient.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
