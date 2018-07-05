import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileInfoProfileComponent} from './profile-info-profile.component';

describe('ProfileInfoProfileComponent', () => {
    let component: ProfileInfoProfileComponent;
    let fixture: ComponentFixture<ProfileInfoProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileInfoProfileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileInfoProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
