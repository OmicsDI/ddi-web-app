/**
 * Created by azorin on 13/02/2018.
 */

export class MergeCandidate {
    public database: string;
    public accession: string;
    public name: string;
    public similars: {database:string, accession:string}[];
}
