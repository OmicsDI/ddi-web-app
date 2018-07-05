import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OmicsImageDashboardComponent} from './omics-image-dashboard.component';

describe('OmicsImageDashboardComponent', () => {
    let component: OmicsImageDashboardComponent;
    let fixture: ComponentFixture<OmicsImageDashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OmicsImageDashboardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OmicsImageDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
