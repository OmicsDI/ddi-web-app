import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SocialnetworksDatasetComponent} from './socialnetworksdataset.component';


describe('SocialnetworksDatasetComponent', () => {
    let component: SocialnetworksDatasetComponent;
    let fixture: ComponentFixture<SocialnetworksDatasetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SocialnetworksDatasetComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SocialnetworksDatasetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
