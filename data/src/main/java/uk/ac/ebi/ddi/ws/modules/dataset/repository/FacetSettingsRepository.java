package uk.ac.ebi.ddi.ws.modules.dataset.repository;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.ac.ebi.ddi.ws.modules.dataset.util.FacetSettings;

/**
 * Created by azorin on 22/06/2017.
 */
@Repository
public interface FacetSettingsRepository extends CrudRepository<FacetSettings,String> {
    @Query("{databaseName : ?0}")
    FacetSettings getFirstByMaxFacetCount (int maxFacetCount);

}
