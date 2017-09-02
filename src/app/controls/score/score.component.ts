import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  constructor() { }

  @Input() accession: string;
  @Input() source: string;

  ngOnInit() {
  }

}
