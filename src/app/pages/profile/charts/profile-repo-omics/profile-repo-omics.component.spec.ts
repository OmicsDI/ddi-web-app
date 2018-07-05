import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileRepoOmicsComponent} from './profile-repo-omics.component';

describe('ProfileRepoOmicsComponent', () => {
    let component: ProfileRepoOmicsComponent;
    let fixture: ComponentFixture<ProfileRepoOmicsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileRepoOmicsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileRepoOmicsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
