import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {UtilsModule} from '@shared/modules/utils/utils.module';
import {ControlsModule} from '@shared/modules/controls/controls.module';
import {PipesModule} from '@shared/pipes/pipes.module';
import {RouterModule} from '@angular/router';
import {MatCheckboxModule} from '@angular/material';
import {HomeComponent} from '@modules/home/components/home/home.component';
import {AnnualOmicstypeComponent} from '@modules/home/components/annual-omicstype/annual-omicstype.component';
import {HomeAboutComponent} from '@modules/home/components/home-about/home-about.component';
import {HotwordsComponent} from '@modules/home/components/hotwords/hotwords.component';
import {LatestDatasetsComponent} from '@modules/home/components/latest-datasets/latest-datasets.component';
import {MostAccessedComponent} from '@modules/home/components/most-accessed/most-accessed.component';
import {ReposOmicsComponent} from '@modules/home/components/repos-omics/repos-omics.component';
import {StatisticsPanelComponent} from '@modules/home/components/statistics-panel/statistics-panel.component';
import {TissuesOrganismsComponent} from '@modules/home/components/tissues-organisms/tissues-organisms.component';
import {TweetsNewsComponent} from '@modules/home/components/tweets-news/tweets-news.component';
import {BubbleChartDirective} from '@shared/directives/bubble-chart.directive';
import {MegaNumberPipe} from '@shared/pipes/mega-number.pipe';

@NgModule({
    providers: [
      MegaNumberPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule,
        ControlsModule,
        RouterModule,
        UtilsModule,
        PipesModule,
        ClipboardModule
    ],
    declarations: [
        HomeComponent,
        AnnualOmicstypeComponent,
        HomeAboutComponent,
        HotwordsComponent,
        LatestDatasetsComponent,
        MostAccessedComponent,
        ReposOmicsComponent,
        StatisticsPanelComponent,
        TissuesOrganismsComponent,
        TweetsNewsComponent,
        BubbleChartDirective
    ]
})
export class HomeModule {
}
