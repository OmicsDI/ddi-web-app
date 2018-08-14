/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';
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
import {Http, RequestOptions} from "@angular/http";
import {DashboardViewsCountComponent} from "@modules/profile-charts/components/dashboard-views-count/dashboard-views-count.component";
import {DashboardReanalisysCountComponent} from "@modules/profile-charts/components/dashboard-reanalisys-count/dashboard-reanalisys-count.component";
import {DashboardConnectionsCountComponent} from "@modules/profile-charts/components/dashboard-connections-count/dashboard-connections-count.component";
import {DashboardClaimCountComponent} from "@modules/profile-charts/components/dashboard-claim-count/dashboard-claim-count.component";
import {DashboardCitationsCountComponent} from "@modules/profile-charts/components/dashboard-citations-count/dashboard-citations-count.component";

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
            // for input,select.etc
            FormsModule,
            ClipboardModule,
            UtilsModule,
            PipesModule
        ],
      declarations: [
          ProfileComponent,
          ProfileInfoComponent,
          DatasetWidgetComponent,
          ProfileContactsComponent,
          CountingDataDashboardComponent,
          DashboardViewsCountComponent,
          DashboardReanalisysCountComponent,
          DashboardConnectionsCountComponent,
          DashboardClaimCountComponent,
          DashboardCitationsCountComponent
      ],
        providers: [
            ProfileService,
            DataSetService,
            FormBuilder,
            AppConfig,
            , {
                provide: AuthHttp,
                useFactory: authHttpServiceFactory,
                deps: [Http, RequestOptions]
            },
            {provide: LocationStrategy, useClass: PathLocationStrategy},
            { provide: ComponentFixtureAutoDetect, useValue: true },
            // set base href
            {provide: APP_BASE_HREF, useValue: '/'}
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
