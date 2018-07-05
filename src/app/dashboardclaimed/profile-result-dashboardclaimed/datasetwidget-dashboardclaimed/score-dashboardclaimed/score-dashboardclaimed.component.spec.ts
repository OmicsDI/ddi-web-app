import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ScoreDashboardclaimedComponent} from './score-dashboardclaimed.component';

describe('ScoreDashboardclaimedComponent', () => {
    let component: ScoreDashboardclaimedComponent;
    let fixture: ComponentFixture<ScoreDashboardclaimedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScoreDashboardclaimedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScoreDashboardclaimedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
