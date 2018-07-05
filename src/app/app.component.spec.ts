import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterLinkStubDirective, RouterOutletStubComponent} from '../../testing/router-stubs';
import {SlimLoadingBarComponent, SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {AuthService} from 'services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

const mockAuthService = {};
const mockSlimLoadingBarService = {};

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                RouterLinkStubDirective, RouterOutletStubComponent, SlimLoadingBarComponent
            ],
            providers: [
                AuthService, SlimLoadingBarService,
                {
                    provide: ActivatedRoute,
                    useValue: {queryParams: Observable.of({q: 'human'})}
                },
                {
                    provide: Router,
                    useValue: {
                        events: Observable.of({url: '/home'})
                    }
                }
            ]
        });
        TestBed.compileComponents();
    });

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'Omics DI 2.0'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Omics DI 2.0');
    }));

    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h3').textContent).toContain('OmicsDI Databases');
    }));
});
