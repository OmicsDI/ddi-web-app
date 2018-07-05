import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardSelectedComponent} from './selected.component';

describe('SelectedComponent', () => {
    let component: DashboardSelectedComponent;
    let fixture: ComponentFixture<DashboardSelectedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardSelectedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardSelectedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
