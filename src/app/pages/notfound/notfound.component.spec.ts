import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotfoundComponent} from './notfound.component';

describe('404Component', () => {
    let component: NotfoundComponent;
    let fixture: ComponentFixture<NotfoundComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotfoundComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotfoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
