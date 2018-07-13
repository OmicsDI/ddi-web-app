import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from '@modules/help/components/about/about.component';
import {ApiComponent} from '@modules/help/components/api/api.component';

const routes: Routes = [
    {path: 'about', component: AboutComponent},
    {path: 'api', component: ApiComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HelpRoutingModule {
}
