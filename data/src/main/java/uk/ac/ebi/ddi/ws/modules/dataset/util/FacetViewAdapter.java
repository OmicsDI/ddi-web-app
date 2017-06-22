package uk.ac.ebi.ddi.ws.modules.dataset.util;

import org.springframework.beans.factory.annotation.Autowired;
import uk.ac.ebi.ddi.ebe.ws.dao.model.common.Facet;
import uk.ac.ebi.ddi.ws.modules.dataset.repository.FacetSettingsRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by azorin on 21/06/2017.
 */
public class FacetViewAdapter {
    FacetSettingsRepository repository;
    public FacetViewAdapter(FacetSettingsRepository repository){
        this.repository = repository;
    }

    public Facet[] process(Facet[] val){

        /* creating settings for debug
        FacetSettings settings = new FacetSettings();
        settings.maxFacetCount = 33;
        settings.facetProperties = new FacetProperty[2];
        settings.facetProperties[0] = new FacetProperty();
        settings.facetProperties[0].name="Organisms";
        settings.facetProperties[0].caption="Species ($$$)";
        settings.facetProperties[1] = new FacetProperty();
        settings.facetProperties[1].name="GO";
        settings.facetProperties[1].caption="GO Term ($$$$)";
        settings.facetProperties[1].parentFacetName="Source";
        settings.facetProperties[1].parentFacetValue="BioModels";
        repository.save(settings);*/

        FacetSettings facetSettings = repository.findAll().iterator().next();

        List<Facet> result = new ArrayList<>();
        List<FacetProperty> excluded = new ArrayList<>();

        for (FacetProperty facetProperty:facetSettings.facetProperties) {
            Boolean skip = false;
            if(null!=facetProperty.parentFacetName){
                skip = true;
                for(Facet f: val){
                    if((f.getLabel().equals(facetProperty.parentFacetName))
                            &&(f.getFacetValues().length==1)
                            &&(f.getFacetValues()[0].getLabel().equals(facetProperty.parentFacetValue))){
                        skip = false;
                    }
                }
            }
            if(skip) {
                excluded.add(facetProperty);
                continue;
            }

            for(Facet f: val){
                if(f.getLabel().equals(facetProperty.name)){
                    if(null!=facetProperty.caption){
                        f.setLabel(facetProperty.caption);
                    }
                    result.add(f);
                    break;
                }
            }
        }

        for(Facet f: val){
            if(result.size() >= facetSettings.maxFacetCount)
                break;

            Boolean found = false;
            for(Facet r: result){
                if(r.getId().equals(f.getId())) {
                    found = true;
                    break;
                }
            }
            for(FacetProperty r: excluded){
                if(r.name.equals(f.getLabel())) {
                    found = true;
                    break;
                }
            }
            if(!found){
                result.add(f);
            }
        }
        return result.toArray(new Facet[result.size()]);
    }
}
