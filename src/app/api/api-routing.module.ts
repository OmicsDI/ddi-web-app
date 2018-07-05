import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from 'pages/api/api.component';

const routes: Routes = [{
    path: '',
    component: ApiComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ApiRoutingModule {
}
