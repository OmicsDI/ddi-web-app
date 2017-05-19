import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {FacetValue} from "../../model/FacetValue";
import {forEach} from "@angular/router/src/utils/collection";
import {SearchService} from "../../services/search.service";

class FacetValueFiltered extends FacetValue{
  constructor(x: FacetValue){
    super();
    this.value = x.value;
    this.label = x.label;
    this.count = x.count;
  }
  visible: boolean = true;
  checked: boolean = false;
}


@Component({
  selector: 'app-facet',
  templateUrl: './facet.component.html',
  styleUrls: ['./facet.component.css']
})
export class FacetComponent implements OnInit {

  @Input() label: string;
  @Input() facetValues: FacetValue[];
  @Input() id: string;
  @Output() facetValueSelected : EventEmitter<string> = new EventEmitter<string>();

  @ViewChild("searchInput") searchInput: ElementRef;

  facetValuesFiltered:  FacetValueFiltered[];

  constructor(private searchService: SearchService) {

  }

  ngOnInit() {
    this.facetValuesFiltered = this.facetValues.map(x => new FacetValueFiltered(x));
  }

  checkBoxClicked(value:string, event){

    let val: string;

    if(event.target.checked){
      val = "checked";
      this.searchService.selectFacet(this.id,value);
    }else {
      val = "unchecked";
      this.searchService.unselectFacet(this.id,value);
    }
    console.log(">>>" + value + " " + val);
    this.facetValueSelected.emit(value + " " + val);
  }

  labelClicked(value: string, event, isCheckboxChecked: boolean) {
    console.log(`>>>labelClicked ${value} ${event} ${isCheckboxChecked}`);
    event.preventDefault();
    if (isCheckboxChecked) {
      this.searchService.unselectFacet(this.id,value);
    }else {
      this.searchService.selectFacet(this.id,value);
    }
    this.facetValueSelected.emit(value);
    console.log(isCheckboxChecked);
  }

  searchByName(){
    for (let v of this.facetValuesFiltered)
    {
      v.visible = (v.value.toLowerCase().indexOf(this.searchInput.nativeElement.value.toLowerCase()) >= 0);
    }
  }

  isChecked(value:string):boolean{
    return this.searchService.isFacetSelected(this.id, value);
  }
}
