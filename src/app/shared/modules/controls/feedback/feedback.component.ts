import {Component, Input, OnInit} from '@angular/core';
import {FeedbackService} from '@shared/services/feedback.service';
import {Feedback} from 'model/Feedback';
import {SearchService} from '@shared/services/search.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

    isSatisfiedVal: string;
    value = '';
    issue: boolean;
    thanks: boolean;
    labelMessage = 'thank you for your feedback';
    messageData = '';
    selectMessage: string;
    timeout = false;

    @Input()
    query: string;

    constructor(private feedbackService: FeedbackService
        , private searhcService: SearchService
        , private notificationService: NotificationsService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.timeout = true;
        }, 1000);
    }

    save_feedback() {
        const feedback = new Feedback();
        if (this.messageData.length < 15) {
            this.notificationService.error('Feedback error', 'The feedback message must be set to 15 or more characters', {timeOut: 5000});
            return;
        }
        feedback.message = `${this.messageData} ${this.selectMessage}`; // $scope.feedback.messageData + ' '+$scope.feedback.selectMessage
        feedback.userInfo = 'testuser';
        feedback.satisfied = this.isSatisfiedVal === 'true'; // $scope.feedback.isSatisfiedVal
        feedback.searchQuery = this.query;

        this.feedbackService.submit(feedback);

        this.thanks = true;
        this.isSatisfiedVal = null;
        this.messageData = '';
        this.selectMessage = null;

        this.notificationService.success('Feedback sent', 'to application support team');
    }

    satisfiedClick() {
        /** this.txtArea = false;
         this.submitBtn = false;
         this.isSatisfiedDiv=false;
         this.issue=true; **/
    }

    selectEvent(value) {

    }
}
