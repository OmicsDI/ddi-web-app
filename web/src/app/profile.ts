import {DataSet} from "./dataSet";
export class Profile{
    public userId: string;
    public userName: string;
    public accessToken: string;
    public roles: string;
    public orcid: string;
    public affiliation: string;
    public isPublic: boolean;
    public homepage: string;
    public email: string;
    public bio: string;
    public imageUrl: string;

    public dataSets: DataSet[];

    constructor(){
    }
}

