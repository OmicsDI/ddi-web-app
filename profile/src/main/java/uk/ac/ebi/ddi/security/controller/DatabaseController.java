package uk.ac.ebi.ddi.security.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import uk.ac.ebi.ddi.security.model.DatabaseDetail;
import uk.ac.ebi.ddi.security.service.DatabaseListService;

import java.util.List;

/**
 * Created by root on 16.05.17.
 */
@RestController
public class DatabaseController {

    DatabaseListService databaseListService = new DatabaseListService();

    @RequestMapping(value = "/api/database/all", method = RequestMethod.GET)
    @CrossOrigin
    public List<DatabaseDetail> getDatabaseList(){
        List<DatabaseDetail> list = databaseListService.getDatabaseList();
        return list;
    }
}
