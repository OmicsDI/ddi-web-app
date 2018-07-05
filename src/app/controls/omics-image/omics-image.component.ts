import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';

@Component({
    selector: 'app-omics-image',
    templateUrl: './omics-image.component.html',
    styleUrls: ['./omics-image.component.css']
})
export class OmicsImageComponent implements OnInit, OnChanges {

    @Input() omics: string[];
    @Input() size: string;
    width = '';
    height = '';
    omicsImage = 'img/omics/Unknomics2.png';

    constructor() {
    }

    ngOnInit() {
    }

    calculateOmics() {
        if (this.size === 'small') {
            this.width = '15px';
            this.height = '15px';
        }

        if (!this.omics) {
            if (this.size === 'large') {
                this.omicsImage = 'img/omics/Unknomics.png';
            }
            return;
        }

        if (this.omics.indexOf('Multiomics') !== -1) {
            this.omicsImage = 'img/omics/Multipleomics2.png';
        } else if (this.omics.indexOf('Proteomics') !== -1) {
            this.omicsImage = 'img/omics/Proteomics2.png';
        } else if (this.omics.indexOf('Transcriptomics') !== -1) {
            this.omicsImage = 'img/omics/Transcriptomics2.png';
        } else if (this.omics.indexOf('Metabolomics') !== -1) {
            this.omicsImage = 'img/omics/Metabolomics2.png';
        } else if (this.omics.indexOf('Genomics') !== -1) {
            this.omicsImage = 'img/omics/Genomics2.png';
        } else if (this.omics.indexOf('Models') !== -1) {
            this.omicsImage = 'img/omics/BioModel2.png';
        } else {
            this.omicsImage = 'img/omics/Unknomics2.png';
        }

        if (this.size === 'large') {
            this.omicsImage = this.omicsImage.replace('2.png', '.png');
        }
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (const propName in changes) {
            if (propName === 'omics') {
                if (null !== changes[propName].currentValue) {
                    this.calculateOmics();
                }
            }
        }
    }

    omicsList(): string {
        if (!this.omics) {
            return 'no omics defined';
        } else {
            return this.omics.join(',');
        }
    }

}
