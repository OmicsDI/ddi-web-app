import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'claim-all-button',
  templateUrl: './claim-all-button.component.html',
  styleUrls: ['./claim-all-button.component.css']
})
export class ClaimAllButtonComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  claimDataset(){

  }
}
