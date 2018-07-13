import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from '@modules/help/components/about/about.component';

const routes: Routes = [
    {path: 'about', component: AboutComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HelpRoutingModule {
}
