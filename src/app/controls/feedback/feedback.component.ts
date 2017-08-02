import { Component, OnInit } from '@angular/core';
import {FeedbackService} from "../../services/feedback.service";
import {Feedback} from "../../model/Feedback";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private feedbackService: FeedbackService
             ,private searhcService: SearchService ) { }

  ngOnInit() {
  }

  isSatisfiedVal: string;
  issue: boolean;
  thanks: boolean;
  labelMessage: string = "thank you for your feedback";
  messageData: string;
  selectMessage: string;

  save_feedback(){
    var feedback= new Feedback();

    feedback.message = `${this.messageData} ${this.selectMessage}`; //$scope.feedback.messageData + ' '+$scope.feedback.selectMessage
    feedback.userInfo = "testuser";
    feedback.satisfied = this.isSatisfiedVal === "true"; //$scope.feedback.isSatisfiedVal
    feedback.searchQuery = this.searhcService.currentQuery; //$scope.query_for_show

    this.feedbackService.submit(feedback);

    this.thanks = true;
    this.isSatisfiedVal = null;
    this.messageData = null;
    this.selectMessage = null;

    setTimeout (() => {
      this.thanks = false;
    }, 1500)
  }

  satisfiedClick(){
    /** this.txtArea = false;
    this.submitBtn = false;
    this.isSatisfiedDiv=false;
    this.issue=true; **/
  }

  selectEvent(value){

  }

}
