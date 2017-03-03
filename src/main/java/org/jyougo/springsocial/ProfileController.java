package org.jyougo.springsocial;

import org.jyougo.user.UserDTO;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.social.connect.Connection;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.orcid.api.OrcidApi;
import org.springframework.social.orcid.jaxb.beans.OrcidProfile;
import org.springframework.social.orcid.utils.StringUtility;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

/**
 * Created by user on 3/2/2017.
 */

@RestController
public class ProfileController {
    @Inject
    @Qualifier("orcid")
    Connection<OrcidApi> orcid;

    @Inject
    @Qualifier("facebook")
    Connection<Facebook> facebook;



    @RequestMapping(value = "user/profile", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody
    UserDTO profile()
    {
        String displayName = "unknown";
        String imageUrl = "unknown";
        String orcidId = "unknown";

        try {
            OrcidApi orcidApi = orcid.getApi();
            OrcidProfile orcidProfile = orcidApi.messageOperations().getOrcidProfile();
            orcidProfile.getOrcidBio().getPersonalDetails();

            orcidId = orcidProfile.getOrcidIdentifier().getPath();

            String givenName = orcidProfile.getOrcidBio().getPersonalDetails().getGivenNames();
            String familyName = orcidProfile.getOrcidBio().getPersonalDetails().getFamilyName();
            displayName = givenName;

            if (StringUtility.hasContent(familyName)) {
                if (StringUtility.hasContent(displayName)) {
                    displayName += " ";
                    displayName += familyName;
                } else {
                    displayName = familyName;
                }
            }
        }catch(Exception ex){
            //
        }

        try {
            Facebook fb = facebook.getApi();

            displayName = facebook.fetchUserProfile().getName();

            imageUrl = facebook.getImageUrl();

            //int numFriends = fb.friendOperations().getFriends().size();
            //model.addAttribute("facebook", true);
            //model.addAttribute("numFriends", numFriends);
            //String name = facebook.getDisplayName();
            //model.addAttribute("name", name);
            //String imageUrl = facebook.getImageUrl();
            //model.addAttribute("imgUrl", imageUrl);
            //model.addAttribute("movies", movies);
        }catch(Exception ex){
            //
        }

        UserDTO result = new UserDTO();

        result.Name = displayName;
        result.Orcid = orcidId;
        result.ImageUrl = imageUrl;

        return result;
    }
}
