import {OrcidWork} from './OrcidWork';

/**
 * Created by azorin on 18/10/2017.
 */
export class OrcidRecord {
    public familyName: string;
    public givenName: string;
    public name: string;
    public orcId: string;
    public works: OrcidWork[];
}
