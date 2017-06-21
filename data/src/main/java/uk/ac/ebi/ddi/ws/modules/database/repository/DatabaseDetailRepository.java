package uk.ac.ebi.ddi.ws.modules.database.repository;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import uk.ac.ebi.ddi.ws.modules.database.model.DatabaseDetail;

/**
 * Created by root on 16.05.17.
 */
@Repository
public interface DatabaseDetailRepository extends PagingAndSortingRepository<DatabaseDetail,String>{


    @Query("{databaseName : ?0}")
    DatabaseDetail findDatabaseByName(String databaseName);

}
