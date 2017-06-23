package uk.ac.ebi.ddi.ws.modules.feedback;

import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uk.ac.ebi.ddi.service.db.model.feedback.Feedback;
import uk.ac.ebi.ddi.service.db.service.feedback.FeedbackService;
import uk.ac.ebi.ddi.service.db.service.feedback.IFeedbackService;
import uk.ac.ebi.ddi.ws.modules.enrichment.controller.EnrichmentController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.PUT;


/**
 * Created by gaur on 22/2/17.
 */
@Api(value = "feedback", description = "get feedback about search results", position = 0)
@Controller
@RequestMapping(value = "/feedback")
public class FeedbackController {

    private static final Logger logger = LoggerFactory.getLogger(FeedbackController.class);

    //@Autowired(required = true)
    //private HttpServletRequest  request;

    @Autowired
    IFeedbackService feedbackService;


    @CrossOrigin(origins="*")
    //@CrossOrigin(origins = "http://localhost:8080",allowedHeaders = "Content-Type",methods = PUT)
    //@CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping(value = "/saveFeedback", method = PUT)
    @ResponseStatus(HttpStatus.OK) // 200
    public
    @ResponseBody void saveFeedback(@RequestBody Feedback feedback,HttpServletRequest httpServletRequest)
    {
        feedback.setUserInfo(httpServletRequest.getRemoteAddr());
        feedbackService.save(feedback);
    }

    //@CrossOrigin
    @ApiOperation(value = "Retrieve all file feedbacks", position = 1, notes = "Retrieve all feedbacks for search results")
    @RequestMapping(value ="/getAllFeedbacks", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    List<Feedback> getAllFeedbacks()
    {
        return feedbackService.readAll();
    }

    @ApiOperation(value = "Retrieve all file feedbacks by satisfaction status", position = 1, notes = "Retrieve all feedbacks for search results by satisfaction status")
    @RequestMapping(value ="/getFeedbackByStatus", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    List<Feedback> getAllFeedbacksByStatus(@ApiParam(value = "satisfaction status of search result, e.g : true")
                                           @RequestParam(value = "isSatisfied", required = true) Boolean isSatisfied)
    {
        return feedbackService.read(isSatisfied);
    }
    

}
