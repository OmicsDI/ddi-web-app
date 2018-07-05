import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MergeComponent} from 'pages/merge/merge.component';

const routes: Routes = [{
    path: '',
    component: MergeComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MergeRoutingModule {
}
