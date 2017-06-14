import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'similar-molecule',
  templateUrl: './similar-molecule.component.html',
  styleUrls: ['./similar-molecule.component.css']
})
export class SimilarMoleculeComponent implements OnInit {

  @Input() acc: string;
  @Input() repository: string;

  threshold: any = 0.50;

  constructor() { }

  ngOnInit() {
  }

  thresholdChange(step_value: number) {
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

}
