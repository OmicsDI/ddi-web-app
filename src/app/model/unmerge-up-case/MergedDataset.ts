/**
 * Create by Pan
 * asnmsl
 */

import {Scores} from './Scores';
import {ObjectId} from './ObjectId';

export class MergedDataset {
    public database: string;
    public additional: any[];
    public accession: string;
    public dates: any[];
    public crossReferences: any[];
    public claimable: boolean;
    public scores: Scores;
    public currentStatus: string;
    public filePath: string;
    public initHashCode: number;
    public description: string;
    public name: string;
    public id: ObjectId;
}
