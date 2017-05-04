package uk.ac.ebi.ddi.security.controller;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import uk.ac.ebi.ddi.security.model.MongoUser;
import uk.ac.ebi.ddi.security.model.UserAuthentication;
import uk.ac.ebi.ddi.security.model.UserShort;
import uk.ac.ebi.ddi.security.repo.MongoUserDetailsRepository;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

@RestController
public class UserController {

	@Autowired
	MongoUserDetailsRepository mongoUserDetailsRepository;

	@RequestMapping(value = "/api/user/current", method = RequestMethod.GET)
	@CrossOrigin
	public MongoUser getCurrent() {
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication instanceof UserAuthentication) {
			MongoUser user = ((UserAuthentication) authentication).getDetails();
			return mongoUserDetailsRepository.findByUserId(user.getUserId());
		}
		return new MongoUser(); //anonymous user support
	}

	//@RequestMapping(value = "/api/mongo", method = RequestMethod.GET)
	//@CrossOrigin
	//public MongoUser getMongoUser() {
	//	return mongoUserDetailsRepository.findByUserId("0");
	//}

	@RequestMapping(value = "/api/user/current", method = RequestMethod.POST)
	@CrossOrigin
	public void setMongoUser(@RequestBody MongoUser mongoUser) {
		mongoUserDetailsRepository.save(mongoUser);
	}

	@RequestMapping(value = "/api/users/{userId}/picture2", method = RequestMethod.POST)
	@CrossOrigin
	public void setUserPicture(@PathVariable String userId, @RequestBody String picture) {
		MongoUser user = mongoUserDetailsRepository.findByUserId(userId);

		try {

			byte[] b = picture.getBytes();

			user.setImage(b);
		}
		catch(Exception ex){
			System.out.print("Exception:"+ex.getMessage());
		}

		mongoUserDetailsRepository.save(user);
		//System.out.print("PIC:"+picture);
	}

	@PostMapping("/api/users/{userId}/picture")
	public void handleFileUpload(@PathVariable String userId, @RequestParam(value = "file") MultipartFile file,
								   RedirectAttributes redirectAttributes) {
		MongoUser user = mongoUserDetailsRepository.findByUserId(userId);
		try {
			byte[] b = file.getBytes();
			user.setImage(b);
		}catch(Exception ex){
			System.out.print("Exception:"+ex.getMessage());
		}
		mongoUserDetailsRepository.save(user);
	}

	@Autowired
	ServletContext servletContext;

	@RequestMapping(value = "/api/users/{userId}/picture", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	public byte[] getUserPicture(@PathVariable String userId, final HttpServletResponse response) throws IOException {
		response.setHeader("Cache-Control", "no-cache");

		MongoUser user = mongoUserDetailsRepository.findByUserId(userId);
		byte[] b = user.getImage();
		if(null==b){
			InputStream in = servletContext.getResourceAsStream("no_image.jpg");
			b = IOUtils.toByteArray(in);
		}
		return b;
	}

	@RequestMapping(value = "/api/users/{userId}/coauthors", method = RequestMethod.GET)
	@CrossOrigin
	public UserShort[] getCoAuthors(@PathVariable String userId) {
		UserShort[] result = new UserShort[2];

		result[0] = new UserShort();
		result[0].setUserId("1");
		result[0].setUserName("User One");

		result[1] = new UserShort();
		result[1].setUserId("2");
		result[1].setUserName("User Two");

		return result;
	}
}
