package uk.ac.ebi.ddi.security.repo;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import uk.ac.ebi.ddi.security.model.MongoUser;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by user on 3/13/2017.
 */
@Repository
public interface MongoUserDetailsRepository extends PagingAndSortingRepository<MongoUser, String> {
    @Query("{userName: ?0}")
    MongoUser findByName(String name);

    @Query("{_id: ?0, 'isPublic':true}")
    MongoUser findPublicById(String name);

    @Query("{UserId: ?0}")
    MongoUser findByUserId(String UserId);

    Page<MongoUser> findByUserIdNotNull(Pageable pageable);
}
