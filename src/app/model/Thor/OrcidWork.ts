import {WorkExternalIdentifier} from "./WorkExternalIdentifier";
export class OrcidWork{
    public title: string;
    public workType: string = "data-set";
    public publicationYear: string;
    public workExternalIdentifiers: WorkExternalIdentifier[];
    public url: string;
    public shortDescription: string;
    public clientDbName: string;
}

