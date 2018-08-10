import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {SimilarMoleculeService} from '@shared/services/similar-molecule.service';
import {SimilarMolecule} from 'model/SimilarMolecule';
import {DataSet} from 'model/DataSet';
import {Score} from 'model/Score';
import {Chord2} from 'model/Chord2';
import * as d3 from 'd3';

@Component({
    selector: 'similar-molecule',
    templateUrl: './similar-molecule.component.html',
    styleUrls: ['./similar-molecule.component.css']
})
export class SimilarMoleculeComponent implements OnInit, OnChanges {

    @Input() acc: string;
    @Input() repository: string;

    show = true;
    threshold: any = 0.50;
    minimumThreshold = 0.50;
    biological_similarity_info: SimilarMolecule;
    related_datasets_by_biological: DataSet[];
    filteredDatasets: DataSet[];
    related_datasets_by_biological_limit = 0;
    inputdata = {
        connections: [],
        labels: {},
        labelArray: []
    };
    similarityData: SimilarMolecule;

    constructor(private simiMoleService: SimilarMoleculeService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        const self = this;
        if (self.acc && self.repository) {
            if (self.repository === 'metabolomics_workbench') {
                self.repository = 'MetabolomicsWorkbench';
            }

            if (!self.threshold) {
                self.threshold = 0.5;
            }
            this.simiMoleService
                .search(self.acc, self.repository)
                .subscribe(result => {
                    self.similarityData = result;
                    self.biological_similarity_info = result;
                    if (self.biological_similarity_info != null) {
                        self.related_datasets_by_biological_limit = self.find_similarity_limit(
                            self.biological_similarity_info.scores, self.threshold);
                    }
                    self.drawTheChord();
                    // this.filteredDatasets = this.getRelatedDatasets();
                });

            self.simiMoleService
                .searchSimilarityDatasets(self.acc, self.repository)
                .subscribe(data => {
                    self.related_datasets_by_biological = data.datasets;
                    // self.filteredDatasets = self.related_datasets_by_biological;
                    this.getRelatedDatasets(self.threshold);
                });
        }
    }

    find_similarity_limit(scores, threshold) {
        const main_key = this.acc + '@' + this.repository;
        let limit = 0;
        if (scores != null) {
            for (let i = 0; i < scores.length; i++) {
                const score = scores[i];
                const key1 = score.key1;
                const key2 = score.key2;
                if (score.value < threshold) {
                    continue;
                }
                if (key1 === main_key || key2 === main_key) {
                    limit++;
                }
            }
        }
        return limit;
    }

    thresholdChange(step_value: number) {
        if (step_value === 0) {
            this.threshold = 0.5;
        } else {

            this.threshold = (this.threshold * 100 + step_value * 100) / 100 * 1.00;
            this.threshold = this.threshold.toPrecision(2);

            if (this.threshold >= 1) {
                this.threshold = 1.00;
                this.threshold = this.threshold.toPrecision(3);
            }
            if (this.threshold < 0.5) {
                this.threshold = 0.50;
                this.threshold = this.threshold.toPrecision(2);
            }
        }
        if (this.biological_similarity_info != null) {
            this.related_datasets_by_biological_limit = this.find_similarity_limit(this.biological_similarity_info.scores, this.threshold);
        }
        this.getRelatedDatasets(this.threshold);
    }

    thresholdChanged() {
        this.getRelatedDatasets(this.threshold);
    }

    drawTheChord() {
        const self = this;

        if (self.similarityData.scores.length < 1) {
            // d3.select('#dataset_bottom_chord_diagram').style('visibility', 'hidden');
            // d3.select('#dataset_bottom_chord_diagram').remove();
            self.show = false;
            return;
        }

        if (!this.findAScoreBiggerThan(self.similarityData.scores, this.minimumThreshold)) {
            // d3.select('#dataset_bottom_chord_diagram').style('visibility', 'hidden');
            // d3.select('#dataset_bottom_chord_diagram').remove();
            // d3.select('#chord_diagram_fa-spinner').remove();
            self.show = false;
            return;
        }

        d3.select('#chord_diagram_fa-spinner').remove();

        d3.select('#chord_diagram_input')
            .selectAll('input')
            .on('change', function () {
                self.redraw();
            });

        d3.select('#chord_diagram')
            .selectAll('button')
            .on('click', function () {
                self.redraw();
            });

        this.redraw();
    }

    redraw() {
        d3.select('#chord_diagram')
            .selectAll('svg')
            .remove();

        d3.select('#chord_diagram')
            .selectAll('div')
            .remove();

        this.prepareInputData();

        const data = [this.inputdata], width = 350, height = 430, padding = .09;

        const chord2 = new Chord2();
        chord2.cwidth(width)
            .cheight(height)
            .cpadding(padding);

        const chord_diagram = d3.select('#chord_diagram')
            .selectAll('svg')
            .data(data)
            .enter()
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        chord2.init(chord_diagram);
    }

    prepareInputData() {
        const inputdata = this.inputdata = {
            connections: [],
            labels: {},
            labelArray: []
        };

        const labels = [];

        const main_key = this.acc + '@' + this.repository;
        inputdata.labels[0] = main_key;
        labels[0] = main_key;
        const connection = [], bend1 = {}, bend2 = {};
        bend1['group'] = 0;
        bend1['value'] = 0;
        bend2['group'] = 0;
        bend2['value'] = 0;
        connection[0] = bend1;
        connection[1] = bend2;
        inputdata.connections.push(connection);

        this.sortSimilarityScores(this.similarityData.scores);
        for (let i = 0, indexOfLabels = 1; i < this.similarityData.scores.length; i++) {
            const score = this.similarityData.scores[i]
                , key1 = score.key1
                , key2 = score.key2
                , intScore = Math.round(score.value * 100);

            if (score.value < this.threshold) {
                continue;
            }

            if (key1 === main_key || key2 === main_key) {
                if (labels.indexOf(key1) < 0) {
                    inputdata.labels[indexOfLabels] = key1;
                    labels[indexOfLabels] = key1;
                    indexOfLabels++;
                }

                if (labels.indexOf(key2) < 0) {
                    inputdata.labels[indexOfLabels] = key2;
                    labels[indexOfLabels] = key2;
                    indexOfLabels++;
                }
            }
        }

        // select the connections above the threshold
        for (let i = 0; i < this.similarityData.scores.length; i++) {
            const con = [], b1 = {}, b2 = {};
            const score = this.similarityData.scores[i];
            const key1 = score.key1;
            const key2 = score.key2;
            const intScore = Math.round(score.value * 100);

            // remove the connections which are less than threshold
            if (score.value < this.threshold || labels.indexOf(key1) < 0 || labels.indexOf(key2) < 0) {
                continue;
            }

            b1['group'] = labels.indexOf(key1);
            b1['value'] = intScore;
            b2['group'] = labels.indexOf(key2);
            b2['value'] = intScore;

            con[0] = b1;
            con[1] = b2;

            inputdata.connections.push(con);
        }
        inputdata.labelArray = labels;

    }

    sortSimilarityScores(scores: Score[]) {
        for (let i = 0; i < scores.length; i++) {
            const tempScore = scores[i];
            let maxScoreValue = 0;
            let maxIndex = 0;
            for (let j = scores.length - 1; j >= i; j--) {
                if (scores[j].value > maxScoreValue) {
                    maxIndex = j;
                    maxScoreValue = scores[j].value;
                }
            }
            scores[i] = scores[maxIndex];
            scores[maxIndex] = tempScore;
        }
    }

    findAScoreBiggerThan(scores: Score[], minimumThreshold: number) {
        const main_key = this.acc + '@' + this.repository;
        for (let i = 0; i < scores.length; i++) {
            const key1 = scores[i].key1;
            const key2 = scores[i].key2;
            if (scores[i].value >= minimumThreshold && (key1 === main_key || key2 === main_key)) {
                return true;
            }
        }
        return false;
    }

    getRelatedDatasets(threshold: number) {
        this.filteredDatasets = [];
        for (const d of this.related_datasets_by_biological) {
            if (d.score >= threshold) {
                this.filteredDatasets.push(d);
            }
        }
    }

}
