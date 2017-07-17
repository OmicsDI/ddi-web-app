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

  public unselect(source, accession){
    this.i-=1;
  }

  public selected(){
    return this.i;
  }

  public dataSets: DataSetShort[] = [{id: "PXD001020", source: "pride", claimed:"yes", omics_type:["Proteomics"], name:"data set name" }
  ,{id: "MODEL1102020002", source: "biomodels", claimed:"yes", omics_type:["Proteomics"], name:"data set name" }];
}
