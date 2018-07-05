import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReposOmicsComponent} from './repos-omics.component';

describe('ReposOmicsComponent', () => {
    let component: ReposOmicsComponent;
    let fixture: ComponentFixture<ReposOmicsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReposOmicsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReposOmicsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
