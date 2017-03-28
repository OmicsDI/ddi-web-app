import { Component, OnInit } from '@angular/core';
import {SimilarityService} from "../../../services/similarity.service";

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit {

  //subscription: Subscription;

  constructor(private similarityService: SimilarityService) {
  }

  ngOnInit() {
  }

}
