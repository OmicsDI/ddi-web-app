import {OrcidExternalIdentifier} from './OrcidExternalIdentifier';

/**
 * Created by azorin on 28/09/2017.
 */
export class OrcidWork {
    public title: string;
    public workType = 'data-set'; // "data-set",
    public publicationYear: string; // "2001"
    public workExternalIdentifiers: OrcidExternalIdentifier[];
    public url: string; // "nononxoxox"
}
