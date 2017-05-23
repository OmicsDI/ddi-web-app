package uk.ac.ebi.ddi.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.ac.ebi.ddi.security.model.DatabaseDetail;
import uk.ac.ebi.ddi.security.repo.DatabaseDetailRepository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by root on 16.05.17.
 */
@Service
public class DatabaseDetailService {

    DatabaseDetailRepository databaseDetailRepository;

    @Autowired
    public DatabaseDetailService(DatabaseDetailRepository databaseDetailRepository) {
        this.databaseDetailRepository = databaseDetailRepository;
    }
    public List<DatabaseDetail> getDatabaseList() {
        List<DatabaseDetail> databaseDetailList = new ArrayList<>();
        Iterable<DatabaseDetail> iterable = databaseDetailRepository.findAll();
        for(DatabaseDetail databaseDetail : databaseDetailRepository.findAll()){
            databaseDetail.setImage(null);
            databaseDetailList.add(databaseDetail);
        }
        return databaseDetailList;
    }

    public DatabaseDetail findDatabaseByName(String databaseName) {

        DatabaseDetail databaseDetail = databaseDetailRepository.findDatabaseByName(databaseName);
        return databaseDetail == null ? new DatabaseDetail() : databaseDetail;
    }

    public void saveDatabase(DatabaseDetail databaseDetail) {
        databaseDetailRepository.save(databaseDetail);
    }

}
