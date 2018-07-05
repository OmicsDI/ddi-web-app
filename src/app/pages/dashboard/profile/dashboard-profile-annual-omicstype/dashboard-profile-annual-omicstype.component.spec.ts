import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardProfileAnnualOmicstypeComponent} from './dashboard-profile-annual-omicstype.component';

describe('DashboardProfileAnnualOmicstypeComponent', () => {
    let component: DashboardProfileAnnualOmicstypeComponent;
    let fixture: ComponentFixture<DashboardProfileAnnualOmicstypeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardProfileAnnualOmicstypeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardProfileAnnualOmicstypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
