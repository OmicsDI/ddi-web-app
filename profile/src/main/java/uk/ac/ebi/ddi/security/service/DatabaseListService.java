package uk.ac.ebi.ddi.security.service;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import uk.ac.ebi.ddi.security.model.DatabaseDetail;
import uk.ac.ebi.ddi.security.repo.DatabaseListRepository;

import java.net.UnknownHostException;
import java.util.List;

/**
 * Created by root on 16.05.17.
 */
@Service
public class DatabaseListService implements DatabaseListRepository{

    private static final String databaseCollection = "databases";

    Mongo mongo;
    MongoTemplate mongoTemplate;

    public DatabaseListService() {
        try {
            this.mongo = new MongoClient("localhost");
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        this.mongoTemplate  = new MongoTemplate(mongo,"demo");
    }

    @Override
    public List<DatabaseDetail> getDatabaseList() {
        return mongoTemplate.findAll(DatabaseDetail.class,databaseCollection);
    }

    @Override
    public DatabaseDetail getDatabaseDetailByName(String databaseName) {
//        DatabaseDetail databaseDetail = mongo.findById(databaseName,DatabaseDetail.class);
//        return databaseDetail;
          return null;
    }

    @Override
    public void saveDatabase(DatabaseDetail databaseDetail) {
            mongoTemplate.save(databaseDetail);
    }

}
