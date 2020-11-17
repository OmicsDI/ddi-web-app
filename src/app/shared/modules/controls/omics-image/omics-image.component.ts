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
    omicsImage = 'img/omics/Unknomics.svg';

    constructor() {
    }

    ngOnInit() {
    }

    calculateOmics() {
        if (this.size === 'small') {
            this.width = '20px';
            this.height = '20px';
        }

        if (this.size != 'large') {
            this.width = '20px';
            this.height = '20px';
        }
        if (!this.omics) {
            if (this.size === 'large') {
                this.omicsImage = 'img/omics/Unknomics.svg';
            }
            return;
        }

        if (this.omics.indexOf('Multiomics') !== -1) {
            this.omicsImage = 'img/omics/Multiomics.svg';
        } else if (this.omics.indexOf('Proteomics') !== -1) {
            this.omicsImage = 'img/omics/Proteomics.svg';
        } else if (this.omics.indexOf('Transcriptomics') !== -1) {
            this.omicsImage = 'img/omics/Transcriptomics.svg';
        } else if (this.omics.indexOf('Metabolomics') !== -1) {
            this.omicsImage = 'img/omics/Metabolomics.svg';
        } else if (this.omics.indexOf('Genomics') !== -1) {
            this.omicsImage = 'img/omics/Genomics.svg';
        } else if (this.omics.indexOf('Models') !== -1) {
            this.omicsImage = 'img/omics/Models.svg';
        } else {
            this.omicsImage = 'img/omics/Unknown.svg';
        }

        if (this.size === 'large') {
            this.omicsImage = this.omicsImage.replace('.svg', '.svg');
        }
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (const propName in changes) {
            if (propName === 'omics') {
                if (null != changes[propName].currentValue) {
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
