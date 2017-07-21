package uk.ac.ebi.ddi.security.repo;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.ac.ebi.ddi.security.model.SavedSearch;
import uk.ac.ebi.ddi.security.model.WatchedDataset;

/**
 * Created by azorin on 21/07/2017.
 */

@Repository
public interface WatchedDatasetsRepository extends CrudRepository<WatchedDataset, String> {
    @Query("{UserId: ?0}")
    Iterable<WatchedDataset> findByUserId(String UserId);
}

