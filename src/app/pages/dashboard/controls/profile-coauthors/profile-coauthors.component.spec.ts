import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileCoauthorsComponent} from './profile-coauthors.component';

describe('ProfileCoauthorsComponent', () => {
    let component: ProfileCoauthorsComponent;
    let fixture: ComponentFixture<ProfileCoauthorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileCoauthorsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileCoauthorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
