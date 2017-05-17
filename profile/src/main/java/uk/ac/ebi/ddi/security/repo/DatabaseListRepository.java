package uk.ac.ebi.ddi.security.repo;

import org.springframework.stereotype.Repository;
import uk.ac.ebi.ddi.security.model.DatabaseDetail;

import java.util.List;

/**
 * Created by root on 16.05.17.
 */
@Repository
public interface DatabaseListRepository {

    List<DatabaseDetail> getDatabaseList();

    DatabaseDetail getDatabaseDetailByName(String databaseName);

    void saveDatabase(DatabaseDetail databaseDetail);

}
