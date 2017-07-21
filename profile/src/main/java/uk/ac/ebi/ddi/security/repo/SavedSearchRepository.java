package uk.ac.ebi.ddi.security.repo;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import uk.ac.ebi.ddi.security.model.MongoUser;
import uk.ac.ebi.ddi.security.model.SavedSearch;

/**
 * Created by azorin on 21/07/2017.
 */
@Repository
public interface SavedSearchRepository extends CrudRepository<SavedSearch, String> {

    @Query("{UserId: ?0}")
    Iterable<SavedSearch> findByUserId(String UserId);
}
