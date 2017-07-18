import { Injectable } from '@angular/core';
import {DataSetDetail} from "../model/DataSetDetail";
import {DataSetShort} from "../model/DataSetShort";

@Injectable()
export class SelectedService {

  constructor() { }

  private i: number = 0;

  public select(source, accession){
    this.i+=1;
  }

  public unselect(source, id){
    var i: number = this.dataSets.findIndex(x => x.id==id && x.source==source);
    if(i>-1) {
      this.dataSets.splice(i, 1);
    }
  }

  public isSelected(source, id):boolean{
    var i: number = this.dataSets.findIndex(x => x.id==id && x.source==source);
    return(i>-1);
  }

  public selected(){
    return this.dataSets.length;
  }

  public toggle(source, id){
    var i: number = this.dataSets.findIndex(x => x.id==id && x.source==source);
    if(i>-1){
      this.dataSets.splice(i,1);
    }else{
      this.dataSets.push({id:id, source:source, name: "", claimed: "0", omics_type: null});
    }
  }

  public dataSets: DataSetShort[] = new Array();
  //[{id: "PXD001020", source: "pride", claimed:"yes", omics_type:["Proteomics"], name:"data set name" }
  //
  //
  //
  //,{id: "MODEL1102020002", source: "biomodels", claimed:"yes", omics_type:["Proteomics"], name:"data set name" }];
}
