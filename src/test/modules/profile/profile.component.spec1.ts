/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {ProfileComponent} from '@modules/profile/components/profile/profile.component';
import {APP_BASE_HREF, CommonModule, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {ProfileRoutingModule} from "@modules/profile/profile-routing.module";
import {NgxPaginationModule} from "ngx-pagination";
import {FormBuilder, FormsModule} from "@angular/forms";
import {ClipboardModule} from "ngx-clipboard/dist";
import {UtilsModule} from "@shared/modules/utils/utils.module";
import {ProfileChartsModule} from "@modules/profile-charts/profile-charts.module";
import {ProfileControlsModule} from "@modules/profile-controls/profile-controls.module";
import {ControlsModule} from "@shared/modules/controls/controls.module";
import {PipesModule} from "@shared/pipes/pipes.module";
import {ProfileInfoComponent} from "@modules/profile-controls/components/profile-info/profile-info.component";
import {DatasetWidgetComponent} from "@shared/modules/controls/datasetwidget/datasetwidget.component";
import {ProfileContactsComponent} from "@modules/profile-controls/components/profile-contacts/profile-contacts.component";
import {CountingDataDashboardComponent} from "@modules/profile-charts/components/counting-data-dashboard/counting-data-dashboard.component";
import {ProfileService} from "@shared/services/profile.service";
import {DataSetService} from "@shared/services/dataset.service";
import {AppConfig} from "../../../app/app.config";
import {Router} from "@angular/router";
import {AuthHttp} from "angular2-jwt";
import {authHttpServiceFactory} from "../../../app/app.module";
import {Http, HttpModule, RequestOptions} from "@angular/http";
import {DashboardViewsCountComponent} from "@modules/profile-charts/components/dashboard-views-count/dashboard-views-count.component";
import {DashboardReanalisysCountComponent} from "@modules/profile-charts/components/dashboard-reanalisys-count/dashboard-reanalisys-count.component";
import {DashboardConnectionsCountComponent} from "@modules/profile-charts/components/dashboard-connections-count/dashboard-connections-count.component";
import {DashboardClaimCountComponent} from "@modules/profile-charts/components/dashboard-claim-count/dashboard-claim-count.component";
import {DashboardCitationsCountComponent} from "@modules/profile-charts/components/dashboard-citations-count/dashboard-citations-count.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NotificationsService} from "angular2-notifications/dist";
import {ThorService} from "@shared/services/thor.service";
import {SelectedService} from "@shared/services/selected.service";
import {DatabaseListService} from "@shared/services/database-list.service";
import {DataSetListMockService} from "@test/sharedServices/dataset-list.mock.service";
import {ProfileMockService} from "@test/modules/profile/profile.mock.service";
import {DataSetMockService} from "@test/sharedServices/dataset.mock.service";
import {MatButtonModule, MatDialogModule, MatMenuModule} from "@angular/material";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            CommonModule,
            ProfileRoutingModule,
            NgxPaginationModule,
            // BrowserModule,
            UtilsModule,
            ProfileChartsModule,
            ProfileControlsModule,
            ControlsModule,
            PipesModule,
            // http provider
            HttpModule,
            HttpClientModule,
            // router
            RouterTestingModule,
            // for input,select.etc
            FormsModule,
            // clipboard
            ClipboardModule
            , MatDialogModule
            , MatMenuModule
            , MatButtonModule
        ],
      declarations: [
          ProfileComponent
      ],
        providers: [
            { provide: ProfileService, useClass: ProfileMockService },
            DataSetService,
            FormBuilder,
            AppConfig
            , {
                provide: AuthHttp,
                useFactory: authHttpServiceFactory,
                deps: [Http, RequestOptions]
            },
            {provide: LocationStrategy, useClass: PathLocationStrategy},
            { provide: ComponentFixtureAutoDetect, useValue: true },
            // set base href
            {provide: APP_BASE_HREF, useValue: '/'}
            , NotificationsService
            , SelectedService
            , {provide: DatabaseListService, useClass: DataSetListMockService}
            , {provide: DataSetService, useClass: DataSetMockService}
        ],
    })
    .compileComponents().then( () => {
        fixture = TestBed.createComponent(ProfileComponent);

        component = fixture.componentInstance;
        component.username = 'test';
        fixture.detectChanges();
    });

  }));
// it function can set param for jasmine timeout like 100000,if too many promise need to be loaded,we better set one
  it('Consistency between frontend and backend: Publicprofile componenet', async(() => {

    fixture.whenStable().then(() => {
        fixture.detectChanges();
        const DE = fixture.debugElement;
        const HE = DE.nativeElement;
        const infoUser = HE.querySelector('#userName');
        const bio = HE.querySelector('#bio');
        const datasets = HE.querySelector('#datasets');
        console.log('********');
        console.log(component.profileX.dataSets);
        fixture.detectChanges();
        console.log(component.dataSetDetails);
        fixture.detectChanges();
        console.log(datasets);
        console.log('*******');
        expect(infoUser.textContent).toContain('XuPan');
        expect(bio.textContent).toContain('阿发防守打法胜多负少的范德萨阿斯顿发生打发asdfsdfsadfsadfsadf');
    });
  }), 1666666);

  // it('test done', async(() => {
  //     fixture.detectChanges();
  //     component.getProfile('test');
  //     fixture.whenStable().then(() => {
  //         fixture.detectChanges();
  //         const DE = fixture.debugElement;
  //         const HE = DE.nativeElement;
  //         const infoUser = HE.querySelector('#userName');
  //         const bio = HE.querySelector('#bio');
  //         const datasets = HE.querySelector('#datasets');
  //         console.log('********');
  //         console.log(component.profileX.dataSets);
  //         console.log(component.dataSetDetails);
  //         console.log(datasets);
  //         console.log('*******');
  //         expect(infoUser.textContent).toContain('XuPan');
  //         expect(bio.textContent).toContain('阿发防守打法胜多负少的范德萨阿斯顿发生打发asdfsdfsadfsadfsadf');
  //     });
  // }), 10000);
});
