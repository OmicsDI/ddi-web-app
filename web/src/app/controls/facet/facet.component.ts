import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {FacetValue} from "../../model/FacetValue";
import {forEach} from "@angular/router/src/utils/collection";

class FacetValueFiltered extends FacetValue{
  constructor(x: FacetValue){
    super();
    this.value = x.value;
    this.label = x.label;
    this.count = x.count;
    this.visible = true;
  }
  visible: boolean = true;
}


@Component({
  selector: 'app-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.css']
})
export class FacetComponent implements OnInit {

  @Input() label: string;
  @Input() facetValues: FacetValue[];
  @Output() facetValueSelected : EventEmitter<string> = new EventEmitter<string>();

  @ViewChild("searchInput") searchInput: ElementRef;

  facetValuesFiltered:  FacetValueFiltered[];

  constructor() { }

  ngOnInit() {
    this.facetValuesFiltered = this.facetValues.map(x => new FacetValueFiltered(x));
  }

  checkBoxClicked(value:string, event){

    let val: string;

    if(event.target.checked){
      val = "checked";
    }else {
      val = "unchecked";
    }

    this.facetValueSelected.emit(value + " " + val);
  }

  searchByName(){
    for (let v of this.facetValuesFiltered)
    {
      v.visible = (v.value.toLowerCase().indexOf(this.searchInput.nativeElement.value.toLowerCase()) >= 0);
    }
  }


}
