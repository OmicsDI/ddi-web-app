import {Component, OnInit} from '@angular/core';
import {FeedbackService} from 'services/feedback.service';
import {Feedback} from 'model/Feedback';
import {SearchService} from 'services/search.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {setTimeout} from 'timers';

@Component({
    selector: 'app-feedback-dashboardfeedback',
    templateUrl: './feedback-dashboardfeedback.component.html',
    styleUrls: ['./feedback-dashboardfeedback.component.css']
})
export class FeedbackDashboardfeedbackComponent implements OnInit {

    isSatisfiedVal: string;
    issue: boolean;
    thanks: boolean;
    labelMessage = 'thank you for your feedback';
    messageData: string;
    selectMessage: string;
    timeout = false;

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

        feedback.message = `${this.messageData} ${this.selectMessage}`; // $scope.feedback.messageData + ' '+$scope.feedback.selectMessage
        feedback.userInfo = 'testuser';
        feedback.satisfied = this.isSatisfiedVal === 'true'; // $scope.feedback.isSatisfiedVal
        feedback.searchQuery = this.searhcService.currentQuery; // $scope.query_for_show

        this.feedbackService.submit(feedback);

        this.thanks = true;
        this.isSatisfiedVal = null;
        this.messageData = null;
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
