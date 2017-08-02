import {Component, OnInit, Input} from '@angular/core';
import {Section} from "../../model/EnrichmentInfo/Section";

@Component({
  selector: 'annotated-text',
  templateUrl: './annotated-text.component.html',
  styleUrls: ['./annotated-text.component.css']
})
export class AnnotatedTextComponent implements OnInit {

  @Input() text: string;
  @Input() sections: Section[];

  constructor() { }

  ngOnInit() {
  }

}
