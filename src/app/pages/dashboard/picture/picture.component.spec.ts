import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardPictureComponent} from './picture.component';

describe('DashboardPictureComponent', () => {
    let component: DashboardPictureComponent;
    let fixture: ComponentFixture<DashboardPictureComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardPictureComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardPictureComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
