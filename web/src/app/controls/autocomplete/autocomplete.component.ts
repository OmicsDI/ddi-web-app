import {Component, OnInit, ElementRef} from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  ngOnInit() {
  }

  public query = '';
  public countries = [ "Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus",
    "Belgium","Bosnia & Herzegovina","Bulgaria","Croatia","Cyprus",
    "Czech Republic","Denmark","Estonia","Finland","France","Georgia",
    "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo",
    "Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta",
    "Moldova","Monaco","Montenegro","Netherlands","Norway","Poland",
    "Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia",
    "Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"];
  public filteredList = [];
  public elementRef;

  public selected = [];

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  filter() {
    if (this.query !== ""){
      this.filteredList = this.countries.filter(function(el){
        return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
    }else{
      this.filteredList = [];
    }
  }

  select(item){
    this.selected.push(item);
    this.query = '';
    this.filteredList = [];
  }

  remove(item){
    this.selected.splice(this.selected.indexOf(item),1);
  }

  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if(!inside){
      this.filteredList = [];
    }
  }

}
