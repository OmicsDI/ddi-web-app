import {Organism} from './Organism';
import {Disease} from './Disease';
import {Tissue} from './Tissue';

/**
 * Created by user on 3/22/2017.
 */

export class DataSet {
    id: string;
    source: string;
    title: string;
    description: string;
    keywords: string[];
    organisms: Organism[];
    tissues: Tissue[];
    diseases: Disease[];
    visitCount: number;
    publicationDate: string;
    score?: any;
    omicsType: string[];
    claimable: boolean;

    citationsCount: number;
    connectionsCount: number;
    reanalysisCount: number;
    viewsCount: number;

    constructor() {
        this.omicsType = [];
    }

    omicsTest(omics: string): boolean {
        if (this.omicsType === null) {
            return false;
        }
        return (this.omicsType.indexOf(omics) !== -1);
    }

    isMultiomics(): boolean {
        return this.omicsTest('Multiomics');
    }

    isProteomics(): boolean {
        return this.omicsTest('Proteomics');
    }

    isMetabolomics(): boolean {
        return this.omicsTest('Metabolomics');
    }

    isGenomics(): boolean {
        return this.omicsTest('Genomics');
    }

    isTranscriptomics(): boolean {
        return this.omicsTest('Transcriptomics');
    }

    /*****************
     <img [src]="img/omics/Multipleomics2.png" *ngIf="d.isMultiomics()">
     <img src="img/omics/Proteomics2.png" *ngIf="d.isProteomics()">
     <img src="img/omics/Metabolomics2.png" *ngIf="d.isMetabolomics()">
     <img src="img/omics/Genomics2.png" *ngIf="d.isGenomics()">
     <img src="img/omics/Transcriptomics2.png" *ngIf="d.isTranscriptomics()">
     *****************/

}


