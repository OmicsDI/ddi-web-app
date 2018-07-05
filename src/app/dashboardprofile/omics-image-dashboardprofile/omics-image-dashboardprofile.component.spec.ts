import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OmicsImageDashboardprofileComponent} from './omics-image-dashboardprofile.component';


describe('OmicsImageDashboardprofileComponent', () => {
    let component: OmicsImageDashboardprofileComponent;
    let fixture: ComponentFixture<OmicsImageDashboardprofileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OmicsImageDashboardprofileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OmicsImageDashboardprofileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
