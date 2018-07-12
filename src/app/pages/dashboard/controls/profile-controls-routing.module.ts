import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from 'pages/profile/profile.component';

const routes: Routes = [
    {path: 'dataset/:domain/:acc', loadChildren: '../../../dataset/dataset.module#DatasetModule'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileControlsRoutingModule {
}
