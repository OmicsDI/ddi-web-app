import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FacetValue} from "../../model/FacetValue";

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  constructor() {
    this.valueChange = new EventEmitter<string>();
  }

  adv_show: boolean = false;
  placeValue: string = '--click to input--';

  @Input() value: string;
  @Output() valueChange: EventEmitter<string>;

  @Input() facetValues: FacetValue[];

  ngOnInit() {
  }

  setRuleData(facet: FacetValue){
    this.value = facet.value
    this.valueChange.emit(this.value);
  }


}
